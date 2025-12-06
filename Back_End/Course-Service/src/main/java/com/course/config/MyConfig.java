package com.course.config;

import com.course.error.FeignClientDecoder;
import feign.codec.ErrorDecoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyConfig {


    @Bean
    public ErrorDecoder errorDecoder(){
        return new FeignClientDecoder();
    }

}
