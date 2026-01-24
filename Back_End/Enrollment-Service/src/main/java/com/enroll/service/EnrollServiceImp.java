package com.enroll.service;

import com.enroll.dto.*;
import com.enroll.entity.Enrollment;
import com.enroll.error.EnrollmentException;
import com.enroll.external.client.AuthServiceImpl;
import com.enroll.external.client.CourseServiceImpl;
import com.enroll.external.client.PaymentServiceImpl;
import com.enroll.external.others.PaymentRequestDto;
import com.enroll.external.others.ResponseCourseDTO;
import com.enroll.reposistory.EnrollReposistory;
import feign.RetryableException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    @Value("${payment-service.url}")  // ONLY IN TESTING
    private String paymentURL = "http://PAYMENT-SERVICE/payment";


    //go inside the avro class go to package right-click -> marks as source dir
    // ->click root to get Avro class
    @Autowired
    private KafkaTemplate<String,  com.enroll.event.SendNotify> kafkaTemplate;



    @Override
    @Transactional
    public EnrollResponseDTO enrollCourse(RequestDTO dto) {
        //verify the course first ---- Course-Service
        try {
             courseService.checkCourse(dto.courseId());
        }catch (RetryableException e){
            throw new EnrollmentException("Course-Service is down");
        }

        //check if previously purchase or not!!
        reposistory.findByUserIdAndCourseId(dto.userId(), dto.courseId())
                .filter(f->f.stream().anyMatch(a->a.getStatus().equals(EnrollStatus.COMPLETED)))
                .ifPresent(f->{
                    throw new EnrollmentException("Course already purchased...");
                });

         //call the auth-> Service to get Customer INFO
         String userMail = null;
            try {
                 userMail = authService.isPresent(dto.userId());
            }catch (RetryableException e){
               throw new EnrollmentException("Auth-Service is down  ::" + e.getMessage());
           }

        Enrollment enrollment = new Enrollment();
        enrollment.setEnroll_id(UUID.randomUUID().toString());
        enrollment.setCourseId(dto.courseId());
        enrollment.setUserId(dto.userId());
        enrollment.setStatus(EnrollStatus.PENDING);

        //rest template for ---- Payment-Service
        PaymentRequestDto requestDTO = new PaymentRequestDto(dto.userId(), dto.courseId(),
                dto.price(), dto.paymentMethod(), dto.countryName(), dto.cardNumber(), dto.monthYear(),
                dto.cvNumber(), dto.accountName()
                );
        String paymentID = null;
        try{
            paymentID = restTemplate.postForObject(paymentURL+"/process", requestDTO,  String.class);
            enrollment.setEnrolled_at(Instant.now());
            enrollment.setPaymentId(paymentID);
            enrollment.setStatus(EnrollStatus.COMPLETED);

            //send notification to Notify-Service
            com.enroll.event.SendNotify notify = new com.enroll.event.SendNotify();
            notify.setEmail(userMail);
            notify.setSubject("Course Purchase");
            notify.setMsg("you have successfully purchase the course..Have a good day.");
            kafkaTemplate.send("sendMsg", notify);

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
    public List<EnrollmentResponse> getEnrolledCourseByUSER(String userId) {
        Optional<List<Enrollment>> enrollment =  reposistory.findAllByUserId(userId);
        List<EnrollmentResponse> enrollmentResponseList = new java.util.ArrayList<>(List.of());
        if(enrollment.isPresent()){
           ResponseCourseDTO courseDTO = null;
           try{
             int i = 0;
             for (Enrollment e : enrollment.get()) {
                  String enrollID = enrollment.get().get(i).getEnroll_id();
                  String courseId = e.getCourseId();  //get each course details here
                  courseDTO = courseService.getCourseInfo(courseId);
                  //add to result
                  enrollmentResponseList.add(new EnrollmentResponse(enrollID, userId, courseDTO));
                  i++;
            }
           return enrollmentResponseList;
           }catch (RetryableException e){
               throw new EnrollmentException("course service is down");
           }
       }else{
           throw new EnrollmentException("no enroll courses");
       }
    }


    @Override
    public List<EnrollmentDTO> getAllEnrollmentCourse() {
        return reposistory.findAll()
                .stream()
                .map(m->new EnrollmentDTO(m.getEnroll_id(),
                        m.getUserId(), m.getCourseId(), m.getStatus(),m.getEnrolled_at(), m.getPaymentId()))
                .toList();
    }



}
