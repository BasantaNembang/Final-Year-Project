package com.payment.controller;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.payment.dto.*;
import com.payment.entity.PaymentEntity;
import com.payment.reposistory.PaymentRepo;
import com.payment.service.PaymentService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.mysql.MySQLContainer;
import org.testcontainers.utility.DockerImageName;

import java.time.Instant;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Testcontainers
public class PaymentControllerTest {


    @Autowired
    private PaymentService service;

    @Autowired
    private PaymentRepo repo;

    @Autowired
    private MockMvc mockMvc;


    private ObjectMapper mapper = new ObjectMapper().findAndRegisterModules()
            .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);


    @Container
    static MySQLContainer mySQLContainer =
               new MySQLContainer(DockerImageName.parse("mysql:8.0"));

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", mySQLContainer::getJdbcUrl);
        registry.add("spring.datasource.username", mySQLContainer::getUsername);
        registry.add("spring.datasource.password", mySQLContainer::getPassword);
    }



    private PaymentRequestDto getPaymentMockDTO() {
        return new PaymentRequestDto(
                "USER-1001",
                "COURSE-JAVA-101",
                1499.99,
                PaymentMethod.DOLLAR_CARD,
                "Nepal",
                4111111111111111L,
                "09/26",
                "456",
                "Jyoti"
        );
    }

    private PaymentEntity getMockPaymentInfo() {
        return new PaymentEntity(
                "PID-1",
                1000.0,
                Instant.now(),
                PaymentStatus.SUCCESS,
                PaymentMethod.DOLLAR_CARD,
                "USER-1",
                "COURSE-1",
                "China",
                1234567890123456L,
                "02/26",
                "123",
                "Jack");
    }



    @DisplayName("save the payment Data-success case")
    @Test
    void saveThePaymentData() throws Exception {
        PaymentRequestDto dto = getPaymentMockDTO();

        MvcResult mvcResult = (MvcResult)
                mockMvc.perform(MockMvcRequestBuilders.post("/payment/process")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(dto))
                        .with(jwt()
                                .authorities(new SimpleGrantedAuthority("ROLE_STUDENT"))
                                .jwt(jwt->jwt
                                        .claim("roles", List.of("STUDENT")))))
                        .andExpect(MockMvcResultMatchers.status().isOk())
                        .andReturn();
    }



    @DisplayName("save the payment Data fail case role-fail")
    @Test
    void saveThePaymentData_Fail() throws Exception {
        PaymentRequestDto dto = getPaymentMockDTO();

        MvcResult mvcResult = (MvcResult)
                mockMvc.perform(MockMvcRequestBuilders.post("/payment/process")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(mapper.writeValueAsString(dto))
                                .with(jwt()
                                        .authorities(new SimpleGrantedAuthority("ROLE_TEACHER"))
                                        .jwt(jwt->jwt
                                                .claim("roles", List.of("TEACHER")))))
                        .andExpect(MockMvcResultMatchers.status().isForbidden())
                        .andReturn();

    }


    @DisplayName("get The Payment Info success")
    @Test
    void getThePaymentInfo() throws Exception {
        PaymentEntity payment = new PaymentEntity(
                "PID-1",
                1000.0,
                Instant.now(),
                PaymentStatus.SUCCESS,
                PaymentMethod.DOLLAR_CARD,
                "USER-1",
                "COURSE-1",
                "USA",
                1234567890123456L,
                "02/26",
                "123",
                "John"
        );
        repo.save(payment);

        MvcResult mvcResult = (MvcResult)
               mockMvc.perform(MockMvcRequestBuilders.get("/payment/get/PID-1")
                               .contentType(MediaType.APPLICATION_JSON)
                               .with(jwt()
                                       .authorities(new SimpleGrantedAuthority("ROLE_STUDENT"))
                                       .jwt(jwt->jwt
                                               .claim("roles", List.of("STUDENT")))))
                       .andExpect(MockMvcResultMatchers.status().isOk())
                       .andReturn();

        String respose = mvcResult.getResponse().getContentAsString();

        PaymentEntity responsePayment = mapper.readValue(respose, PaymentEntity.class);

        Assertions.assertEquals("PID-1", responsePayment.getPid());

    }


    @DisplayName("get The Payment Info fail case")
    @Test
    void getThePaymentInfo_Fail() throws Exception {
        PaymentEntity payment = new PaymentEntity(
                "PID-1",
                1000.0,
                Instant.now(),
                PaymentStatus.SUCCESS,
                PaymentMethod.DOLLAR_CARD,
                "USER-1",
                "COURSE-1",
                "USA",
                1234567890123456L,
                "02/26",
                "123",
                "John"
        );
        repo.save(payment);

        MvcResult mvcResult = (MvcResult)
                mockMvc.perform(MockMvcRequestBuilders.get("/payment/get/PID-2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(jwt()
                                .authorities(new SimpleGrantedAuthority("ROLE_STUDENT"))
                                 .jwt(jwt->jwt
                                      .claim("roles", List.of("STUDENT")))))
                        .andExpect(MockMvcResultMatchers.status().isInternalServerError())
                        .andReturn();


        String response = mvcResult.getResponse().getContentAsString();

        ErrorDTO errorDTO = mapper.readValue(response, ErrorDTO.class);


        Assertions.assertEquals("No such payment is found having the Id", errorDTO.getMsg());


    }



    @DisplayName("get All Payment  success case")
    @Test
    void getAllPaymentInfo() throws Exception {
        PaymentEntity payment = new PaymentEntity(
                "PID-1",
                1000.0,
                Instant.now(),
                PaymentStatus.SUCCESS,
                PaymentMethod.DOLLAR_CARD,
                "USER-1",
                "COURSE-1",
                "USA",
                1234567890123456L,
                "02/26",
                "123",
                "John"
        );
        PaymentEntity payment1 = new PaymentEntity(
                "PID-1",
                1000.0,
                Instant.now(),
                PaymentStatus.SUCCESS,
                PaymentMethod.DOLLAR_CARD,
                "USER-1",
                "COURSE-1",
                "USA",
                1234567890123456L,
                "02/26",
                "123",
                "John"
        );
        repo.save(payment);
        repo.save(payment1);

        MvcResult mvcResult = (MvcResult)
                mockMvc.perform(MockMvcRequestBuilders.get("/payment/get-all")
                                .contentType(MediaType.APPLICATION_JSON)
                                .with(jwt()
                                        .authorities(new SimpleGrantedAuthority("ROLE_STUDENT"))
                                        .jwt(jwt->jwt
                                                .claim("roles", List.of("STUDENT")))))
                        .andExpect(MockMvcResultMatchers.status().isOk())
                        .andReturn();


        String response = mvcResult.getResponse().getContentAsString();

        List<PaymentDto> paymentEntityList =
                mapper.readValue(response, new TypeReference<List<PaymentDto>>() {});


        Assertions.assertEquals(2, paymentEntityList.size());


    }


}

