package com.enroll.service;

import com.enroll.dto.*;
import com.enroll.entity.Enrollment;
import com.enroll.error.EnrollmentException;
import com.enroll.external.client.AuthServiceImpl;
import com.enroll.external.client.CourseServiceImpl;
import com.enroll.external.client.PaymentServiceImpl;
import com.enroll.external.others.PaymentRequestDto;
import com.enroll.external.others.Roles;
import com.enroll.external.others.UserDto;
import com.enroll.reposistory.EnrollReposistory;
import feign.RetryableException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EnrollServiceImp implements EnrollService {

    @Autowired
    private PaymentServiceImpl paymentService;

    @Autowired
    private CourseServiceImpl courseService;

    @Autowired
    private AuthServiceImpl authService;

    @Autowired
    private EnrollReposistory reposistory;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${payment-service.url}")
    private String paymentURL;


    //go inside the avro class go to package right-click -> marks as source dir
    // ->click root to get Avro class
    @Autowired
    private KafkaTemplate<String, com.enroll.event.SendNotify> kafkaTemplate;



    @Override
    @Transactional
    public EnrollResponseDTO enrollCourse(RequestDTO dto) {

        //verify the course first ---- Course-Service
        Boolean aBoolean = null;
        try {
           aBoolean  = courseService.checkCourse(dto.courseId());
        }catch (RetryableException e){
            throw new EnrollmentException("Course-Service is down  ::" + e.getMessage());
        }


        //check if previously purchase or not!!
        reposistory.findByUserIdAndCourseId(dto.userId(), dto.courseId())
                .filter(f->f.stream().anyMatch(a->a.getStatus().equals(EnrollStatus.COMPLETED)))
                .ifPresent(f->{
                    throw new EnrollmentException("Course already purchased...");
                });

        //call the auth-> Service to get Customer INFO
        UserDto userDto = null;
        try {
             userDto = authService.userINFO(dto.userId());
        }catch (RetryableException e){
           throw new EnrollmentException("Auth-Service is down  ::" + e.getMessage());
       }


        Enrollment enrollment = new Enrollment();
        enrollment.setEnroll_id(UUID.randomUUID().toString());
        enrollment.setCourseId(dto.courseId());
        enrollment.setUserId(dto.userId());

        //rest template for ---- Payment-Service
        PaymentRequestDto requestDTO = new PaymentRequestDto(dto.userId(), dto.courseId(),
                dto.price(), dto.paymentMethod(), dto.countryName(), dto.cardNumber(), dto.monthYear(),
                dto.cvNumber(), dto.accountName()
                );
        System.out.println("before sending to payment Service------------------");
        System.out.println(requestDTO);
        String paymentID = null;
        try{
            paymentID = restTemplate.postForObject(paymentURL+"/process", requestDTO,  String.class);
            enrollment.setEnrolled_at(Instant.now());
            enrollment.setStatus(EnrollStatus.COMPLETED);
            enrollment.setPaymentId(paymentID);

            //send notification to Notify-Service
            com.enroll.event.SendNotify notify = new com.enroll.event.SendNotify();
            notify.setEmail(userDto.email());
            notify.setSubject("Course Purchase");
            notify.setMsg("you have successfully purchase the course..Have a good day.");
            //kafkaTemplate.send("sendMsg", notify);

        } catch (Exception e) {
            enrollment.setStatus(EnrollStatus.CANCEL);
            enrollment.setEnrolled_at(Instant.now());
            e.printStackTrace();
        }
        System.out.println("saved data  "+ enrollment);
        reposistory.save(enrollment);

        return EnrollResponseDTO.builder()
                 .enrollID(enrollment.getEnroll_id())
                 .msg(enrollment.getStatus().equals(EnrollStatus.COMPLETED) ?
                       "ENROLL-SUCCESS" :
                        "PAYMENT FAIL - RETRY")
                 .build();
    }

    @Override
    public List<EnrollmentDTO> getAllEnrollmentCourse() {
        return reposistory.findAll()
                .stream()
                .map(m->new EnrollmentDTO(m.getEnroll_id(),
                        m.getUserId(), m.getCourseId(), m.getStatus(),m.getEnrolled_at(), m.getPaymentId()))
                .toList();

    }



    @Override
    public EnrollmentResponse getEnrollmentInfo(String enrollId) {
        Optional<Enrollment> response = reposistory.findById(enrollId);
        if(response.isEmpty()){
            throw new EnrollmentException("No such enrollment is done...  " + enrollId);
        }else{

            //call auth-service
            UserDto userDto = null;
            try {
                userDto = authService.userINFO(response.get().getUserId());
            }catch (RetryableException e){
                throw new EnrollmentException("Auth-Service is down  ::" + e.getMessage());
            }

            //call course-service

            List<String> roles =  userDto.roles()
                                  .stream()
                                  .map(f->f.getName())
                                  .toList();

            return EnrollmentResponse.builder()
                   .userDto(UserDtoResponse.builder()
                           .uid(userDto.uid())
                           .username(userDto.username())
                           .address(userDto.address())
                           .phone_num(userDto.phone_num())
                           .roles(roles)
                           .email(userDto.email())
                           .build())
                    .enroll_id(response.get().getEnroll_id())
                    .build();
        }
    }


}
