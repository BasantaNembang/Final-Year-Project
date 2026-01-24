package com.enroll.controller;

import com.enroll.TestServiceInstanceSupplier;
import com.enroll.dto.EnrollStatus;
import com.enroll.dto.RequestDTO;
import com.enroll.entity.Enrollment;
import com.enroll.external.others.PaymentMethod;
import com.enroll.reposistory.EnrollReposistory;
import com.enroll.service.EnrollServiceImp;
import com.github.tomakehurst.wiremock.client.WireMock;
import com.github.tomakehurst.wiremock.core.WireMockConfiguration;
import com.github.tomakehurst.wiremock.junit5.WireMockExtension;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.cloud.loadbalancer.core.ServiceInstanceListSupplier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.DeserializationFeature;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.ObjectMapper;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.SerializationFeature;
import org.testcontainers.utility.DockerImageName;

import java.util.*;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ComponentScan(basePackages = {"com.enroll"})
@EnableConfigurationProperties
@AutoConfigureMockMvc
@Testcontainers
public class EnrollControllerTest {


    @Autowired
    private EnrollServiceImp serviceImp;

    @Autowired
    private EnrollReposistory enrollReposistory;

    @Autowired
    private MockMvc mockMvc;

    @TestConfiguration
    static class EnrollmentTestConfig {
        @Bean
        public ServiceInstanceListSupplier supplier(){
            return new TestServiceInstanceSupplier();
        }
    }

    //test container
    @Container
    static MySQLContainer<?> mySQLContainer =
            new MySQLContainer<>(DockerImageName.parse("mysql:8.0"));

//  private static final Network NETWORK = Network.newNetwork();
//    @Container
//     static KafkaContainer kafka =
//        new KafkaContainer(
//                DockerImageName
//                        .parse("confluentinc/cp-kafka:7.5.0")
//                        .asCompatibleSubstituteFor("apache/kafka")
//        )
//                .withNetwork(NETWORK)
//                .withNetworkAliases("kafka")
//                //added new
//                .withEnv("KAFKA_BROKER_ID", "1")
//                .withEnv("KAFKA_LISTENERS", "PLAINTEXT://0.0.0.0:9092")
//                .withEnv("KAFKA_ADVERTISED_LISTENERS", "PLAINTEXT://localhost:9092")
//                .withEnv("KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR", "1");
//
//
//    @Container
//    static GenericContainer<?> schemaRegistry =
//            new GenericContainer<>(
//                    DockerImageName.parse("confluentinc/cp-schema-registry:7.5.0")
//            )
//                    .dependsOn(kafka)
//                    .withNetwork(NETWORK)
//                    .withNetworkAliases("schema-registry")
//                    .withExposedPorts(8081)
//                    .withEnv("SCHEMA_REGISTRY_HOST_NAME", "schema-registry")
//                    .withEnv("SCHEMA_REGISTRY_LISTENERS", "http://0.0.0.0:8081")
//                    .withEnv(
//                            "SCHEMA_REGISTRY_KAFKASTORE_BOOTSTRAP_SERVERS",
//                            "PLAINTEXT://kafka:9092"
//                    )
//                    .waitingFor(Wait.forHttp("/subjects").forStatusCode(200)
//                            .withStartupTimeout(Duration.ofSeconds(120)));//        registry.add("spring.kafka.bootstrap-servers", kafka::getBootstrapServers);
//
//        registry.add(
//                "spring.kafka.properties.schema.registry.url",
//                () -> "http://localhost:" + schemaRegistry.getMappedPort(8081));

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", mySQLContainer::getJdbcUrl);
        registry.add("spring.datasource.username", mySQLContainer::getUsername);
        registry.add("spring.datasource.password", mySQLContainer::getPassword);
    }



    @RegisterExtension
    static WireMockExtension mockExtension =
            WireMockExtension.newInstance()
                    .options(WireMockConfiguration
                            .wireMockConfig()
                            .port(8080))
                    .build();

    private ObjectMapper objectMapper = new ObjectMapper()
            .findAndRegisterModules()
            .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);



    private void mockCheckCourse() {
        mockExtension.stubFor(WireMock.get(WireMock.urlMatching("/course/check/.*"))
                .willReturn(WireMock.aResponse()
                        .withStatus(HttpStatus.OK.value())
                        .withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                        .withBody("true")));
    }



    private void mockIsPresent() {
        mockExtension.stubFor(WireMock.post(WireMock.urlMatching("/auth/info/.*"))
                .willReturn(WireMock.aResponse()
                        .withStatus(HttpStatus.OK.value())
                        .withHeader("Content-Type", MediaType.TEXT_PLAIN_VALUE)
                        .withBody("userName")));
    }

    private void mockPayment() {
        mockExtension.stubFor(WireMock.post(WireMock.urlEqualTo("/payment/process"))
                .willReturn(WireMock.aResponse()
                        .withStatus(HttpStatus.OK.value())
                        .withHeader("Content-Type",  MediaType.TEXT_PLAIN_VALUE)
                        .withBody("payment-ID")));
    }

    @BeforeEach
    void setUpEnrollCourse(){

        enrollReposistory.deleteAll();

        //add course for findByUserIdAndCourseId
        Enrollment completedEnrollment = new Enrollment();
        completedEnrollment.setEnroll_id(UUID.randomUUID().toString());
        completedEnrollment.setUserId("USER-456");
        completedEnrollment.setCourseId("COURSE-123");
        completedEnrollment.setStatus(EnrollStatus.CANCEL);
        enrollReposistory.save(completedEnrollment);

        mockCheckCourse();

        mockIsPresent();
        mockPayment();
    }


    private RequestDTO getRequestDTO() {
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

//    private com.enroll.event.SendNotify sendNotificationViaKafka_Success(String topicName) throws InterruptedException {
//        Map<String, Object> consumerProps = new HashMap<>();
//        consumerProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, kafka.getBootstrapServers());  // Correct internal bootstrap
//        consumerProps.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
//        consumerProps.put(ConsumerConfig.GROUP_ID_CONFIG, "notification-service-" + UUID.randomUUID());
//       // consumerProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, org.apache.kafka.common.serialization.StringDeserializer.class);
//        consumerProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,   org.apache.kafka.common.serialization.StringDeserializer.class);
//        consumerProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, KafkaAvroDeserializer.class);
//        consumerProps.put(AbstractKafkaSchemaSerDeConfig.SCHEMA_REGISTRY_URL_CONFIG,
//                "http://" + schemaRegistry.getHost() + ":" + schemaRegistry.getMappedPort(8081));  // Correct mapped port
//        consumerProps.put(KafkaAvroDeserializerConfig.SPECIFIC_AVRO_READER_CONFIG, true);
//
//        // Rest of consumer logic unchanged...
//        try (KafkaConsumer<String, com.enroll.event.SendNotify> consumer = new KafkaConsumer<>(consumerProps)) {
//            consumer.subscribe(Collections.singleton(topicName));
//            long startTime = System.currentTimeMillis();
//            long maxWaitMillis = 10000; // Increased to 10 seconds
//            ConsumerRecords<String, com.enroll.event.SendNotify> records = null;
//            while (System.currentTimeMillis() - startTime < maxWaitMillis) {
//                records = consumer.poll(Duration.ofMillis(500));
//                if (!records.isEmpty()) break;
//            }
//            assertFalse("No Kafka events received!", records == null || records.isEmpty());
//            return records.iterator().next().value();
//        }
//    }


    @DisplayName("Enroll course success")
    @Test
    void enroll_course_success() throws Exception {
        RequestDTO dto  = getRequestDTO();

        MvcResult mvcResult = (MvcResult)
               mockMvc.perform(MockMvcRequestBuilders.post("/enroll/course")
                       .contentType(MediaType.APPLICATION_JSON)
                       .content(objectMapper.writeValueAsString(dto))
                       .with(jwt()  // Adds a default mocked JWT
                               .authorities(new SimpleGrantedAuthority("ROLE_STUDENT"))  // Gives the required role
                               .jwt(jwtBuilder -> jwtBuilder
                                       .claim("roles", List.of("STUDENT"))  // Matches your custom "roles" claim extraction
                               )
                       ))
                       .andExpect(MockMvcResultMatchers.status().isOk())
                       .andReturn();
        //for kafka
       // com.enroll.event.SendNotify notify = sendNotificationViaKafka_Success("sendMsg");


    }



}


