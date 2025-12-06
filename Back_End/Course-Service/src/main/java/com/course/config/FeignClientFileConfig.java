package com.course.config;


import feign.codec.Encoder;
import feign.form.spring.SpringFormEncoder;
import org.springframework.context.annotation.Bean;

public class FeignClientFileConfig {

    @Bean
    public Encoder encoderFeignFIle(){
        return new SpringFormEncoder();
    }

}
