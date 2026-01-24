package com.enroll.service;


import com.enroll.dto.EnrollStatus;
import com.enroll.dto.EnrollmentDTO;
import com.enroll.dto.EnrollmentResponse;
import com.enroll.dto.RequestDTO;
import com.enroll.entity.Enrollment;
import com.enroll.error.EnrollmentException;
import com.enroll.external.client.AuthServiceImpl;
import com.enroll.external.client.CourseServiceImpl;
import com.enroll.external.client.PaymentServiceImpl;
import com.enroll.external.others.PaymentMethod;
import com.enroll.external.others.PaymentRequestDto;
import com.enroll.reposistory.EnrollReposistory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@ExtendWith(MockitoExtension.class)
public class EnrollServiceImpTest {

    @Mock
    private PaymentServiceImpl paymentService;

    @Mock
    private CourseServiceImpl courseService;

    @Mock
    private AuthServiceImpl authService;

    @Mock
    private EnrollReposistory reposistory;

    @Mock
    private RestTemplate restTemplate;


    private static final String paymentURL = "http://PAYMENT-SERVICE/payment";

//    @Mock
//    private KafkaTemplate<String, com.enroll.event.SendNotify> kafkaTemplate;


    @InjectMocks
    EnrollService enrollService = new EnrollServiceImp();


    //Steps for junit testing-> 1.Mocking 2.Actual Method-Call 3.Verification 4.Assertation

    RequestDTO dto = getMockingRequestDTO();

    private Boolean Boolean;

    private RequestDTO getMockingRequestDTO() {
        return new RequestDTO(
                "COURSE-123",
                "USER-456",
                199.99,
                 PaymentMethod.VISA_CARD,
                "United States",
                4111111111111111L,
                "12/26",
                "123",
                "Elon Musk"
        );
    }

    PaymentRequestDto paymentRequestDto = getMockingPaymentRequestDTO();


    private PaymentRequestDto getMockingPaymentRequestDTO() {
        return new PaymentRequestDto(
                "USER-123",
                "COURSE-456",
                199.99,
                PaymentMethod.VISA_CARD,
                "United States",
                4111111111111111L,
                "12/26",
                "123",
                "Elon Musk"
        );
    }


    public List<Enrollment> demoEnrollments() {
        Enrollment e1 = Enrollment.builder()
                .enroll_id("enroll1")
                .userId("user123")
                .courseId("course1")
                .status(EnrollStatus.COMPLETED)
                .enrolled_at(Instant.now())
                .paymentId("pay123")
                .build();

        Enrollment e2 = Enrollment.builder()
                .enroll_id("enroll2")
                .userId("user123")
                .courseId("course2")
                .status(EnrollStatus.PENDING)
                .enrolled_at(Instant.now())
                .paymentId("pay124")
                .build();

        return List.of(e1, e2);
    }



    @DisplayName("Enrollment success Case")
    @Test
    void when_enroll_success(){
        //mocking
        Mockito.when(courseService.checkCourse(dto.courseId()))
                        .thenReturn(true);
        Mockito.when(reposistory.findByUserIdAndCourseId(Mockito.anyString(), Mockito.anyString()))
                .thenReturn(Optional.empty());
        Mockito.when(authService.isPresent(dto.userId()))
                .thenReturn("demo@gmail.com");

        Mockito.when(restTemplate.postForObject(Mockito.eq(paymentURL + "/process"),
                        Mockito.any(PaymentRequestDto.class),
                        Mockito.eq(String.class)))
                .thenReturn("payment-ID");

//        CompletableFuture<SendResult<String, com.enroll.event.SendNotify>> future = CompletableFuture.completedFuture(null);
//        Mockito.when(kafkaTemplate.send(Mockito.anyString(), Mockito.any(com.enroll.event.SendNotify.class)))
//                .thenReturn(future);


        Mockito.when(reposistory.save(Mockito.any(Enrollment.class)))
                .thenReturn(Mockito.any(Enrollment.class));

        //actual method call
        enrollService.enrollCourse(dto);

        //verification
        Mockito.verify(courseService, Mockito.times(1))
                .checkCourse(dto.courseId());
        Mockito.verify(reposistory, Mockito.times(1))
                .findByUserIdAndCourseId(dto.userId(), dto.courseId());
        Mockito.verify(authService, Mockito.times(1))
                .isPresent(dto.userId());

        //Mockito.verify()
        Assertions.assertNotNull(authService.isPresent(dto.userId()));
        Assertions.assertNotNull(restTemplate.postForObject(paymentURL+"/process", paymentRequestDto, String.class));

    }



    @DisplayName("Enrollment fail when Course service is down")
    @Test
    void when_enroll_fail() {

        Mockito.when(courseService.checkCourse(dto.courseId()))
                .thenThrow(new EnrollmentException());

        EnrollmentException exception = Assertions.assertThrows(EnrollmentException.class, ()->{
            enrollService.enrollCourse(dto);
        });

        Mockito.verify(reposistory, Mockito.never()).save(Mockito.any(Enrollment.class));

    }


    @DisplayName("Enrollment fail when Course already taken")
    @Test
    void when_enroll_fail_CourseTaken_Already() {

        Enrollment enrollment = new Enrollment();
        enrollment.setStatus(EnrollStatus.COMPLETED);

        Mockito.when(reposistory.findByUserIdAndCourseId(dto.userId(), dto.courseId()))
                .thenReturn(Optional.of(List.of(enrollment)));

        EnrollmentException exception = Assertions.assertThrows(EnrollmentException.class, ()->{
            enrollService.enrollCourse(dto);
        });

        Assertions.assertEquals("Course already purchased...", exception.getMessage());


        Mockito.verify(reposistory, Mockito.never()).save(Mockito.any(Enrollment.class));

    }


    @DisplayName("Getting the enrolled courses by user success case")
    @Test
    void get_course_by_user_success() {
        //mocking
        Mockito.when(reposistory.findAllByUserId("user123"))
                .thenReturn(Optional.of(demoEnrollments()));

        //actual method
        List<EnrollmentResponse> responses = enrollService.getEnrolledCourseByUSER("user123");

        Mockito.verify(courseService, Mockito.times(1))
                .getCourseInfo(demoEnrollments().get(0).getCourseId());
        Mockito.verify(courseService, Mockito.times(1))
                .getCourseInfo(demoEnrollments().get(1).getCourseId());

        //assertion
        Assertions.assertNotNull(responses);

        Assertions.assertEquals(responses.get(0).enroll_id(), demoEnrollments().get(0).getEnroll_id());
        Assertions.assertEquals(responses.get(1).enroll_id(), demoEnrollments().get(1).getEnroll_id());
    }


    @DisplayName("Getting the enrolled courses :: No enroll course")
    @Test
    void get_course_by_user_fail() {

        Mockito.when(reposistory.findAllByUserId("user1234"))
                        .thenReturn(Optional.empty());

        EnrollmentException exception =  Assertions.assertThrows(EnrollmentException.class, ()->{
            enrollService.getEnrolledCourseByUSER("user1234");
        });

        Assertions.assertNotNull(exception.getMessage(), "no enroll courses");

    }




    @DisplayName("Getting the all enrolled courses")
    @Test
    void get_all_enroll_course() {

        Mockito.when(reposistory.findAll())
                        .thenReturn(demoEnrollments());

        List<EnrollmentDTO> responseData = enrollService.getAllEnrollmentCourse();

        Assertions.assertNotNull(responseData);

        Assertions.assertEquals(responseData.get(0).enroll_id(), demoEnrollments().get(0).getEnroll_id());

        //verify should be called after the method call ::
        Mockito.verify(reposistory, Mockito.times(1))
                .findAll();

    }






}
//use anyValue in mocking
//and realValue in actual method call and verify

