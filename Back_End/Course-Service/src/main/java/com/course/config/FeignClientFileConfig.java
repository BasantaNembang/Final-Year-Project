package com.course.config;


import feign.RequestInterceptor;
import feign.codec.Encoder;
import feign.form.spring.SpringFormEncoder;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class FeignClientFileConfig {

    @Bean
    public Encoder encoderFeignFIle(){
        return new SpringFormEncoder();
    }

    @Bean
    public RequestInterceptor requestInterceptor(){
        return requestTemplate -> {
            ServletRequestAttributes requestAttributes =
                    (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

            if(requestAttributes!=null){
                HttpServletRequest request = requestAttributes.getRequest();
                String authHeader =  request.getHeader("Authorization");

                if(authHeader!=null){
                    requestTemplate.header("Authorization", authHeader);
                }
            }
        };
    }

}

