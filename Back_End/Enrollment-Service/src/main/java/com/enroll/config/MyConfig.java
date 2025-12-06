package com.enroll.config;

import com.enroll.error.FeginClientErrorHandller;
import feign.codec.ErrorDecoder;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class MyConfig {


    @Bean
    ErrorDecoder errorDecoder(){
        return new FeginClientErrorHandller();
    }

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }


}
