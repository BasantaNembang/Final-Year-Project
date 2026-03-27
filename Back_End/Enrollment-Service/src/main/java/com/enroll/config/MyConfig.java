package com.enroll.config;

import com.enroll.error.FeginClientErrorHandller;
import com.enroll.service.JwtService;
import feign.codec.ErrorDecoder;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.observation.ObservationRegistry;
import io.micrometer.observation.aop.ObservedAspect;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.client.RestTemplate;
import feign.micrometer.MicrometerCapability;
import io.micrometer.core.instrument.Counter;


@Configuration
public class MyConfig {

    @Autowired
    private JwtService jwtService;

    private final KafkaTemplate kafkaTemplate;

    public MyConfig(KafkaTemplate kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @PostConstruct
    public void setObservationForKafkaTemplate() {
        kafkaTemplate.setObservationEnabled(true);
    }

    @Bean
    ErrorDecoder errorDecoder(){
        return new FeginClientErrorHandller();
    }


    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder
                .additionalInterceptors((request, body, execution) -> {
                    String token = jwtService.getToken();
                    if (token != null) {
                        request.getHeaders().setBearerAuth(token);
                    }
                    return execution.execute(request, body);
                })
                .build();
    }


    @Bean
    ObservedAspect observedAspect(ObservationRegistry registry) {
        return new ObservedAspect(registry);
    }

    //for feign client
    @Bean
    public MicrometerCapability micrometerCapability(MeterRegistry registry) {
        return new MicrometerCapability(registry);
    }


    @Bean
    @Qualifier("successCounter")
    public Counter successCounter(MeterRegistry registry) {
        return Counter.builder("enroll.count")
                .tag("status", "success")
                .description("Find the success rate of enroll-course")
                .register(registry);
    }

    @Bean
    @Qualifier("failCounter")
    public Counter failCounter(MeterRegistry registry) {
        return Counter.builder("enroll.count")
                .tag("status", "failed")
                .description("Find the fail rate of enroll-course")
                .register(registry);
    }


}

