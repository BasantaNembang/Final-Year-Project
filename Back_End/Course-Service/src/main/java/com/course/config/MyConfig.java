package com.course.config;

import com.course.error.FeignClientDecoder;
import feign.codec.ErrorDecoder;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.observation.ObservationRegistry;
import io.micrometer.observation.aop.ObservedAspect;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class MyConfig {


    @Bean
    public ErrorDecoder errorDecoder(){
        return new FeignClientDecoder();
    }

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(RestTemplateBuilder builder){
        return builder.build();
    }

    @Bean
    ObservedAspect observedAspect(ObservationRegistry registry) {
        return new ObservedAspect(registry);
    }

    @Bean
    @Qualifier("checkCourse")
    public Counter successCounter(MeterRegistry registry) {
        return Counter.builder("course.count")
                .tag("status", "success")
                .description("Find the number of times user click the course")
                .register(registry);
    }



}
