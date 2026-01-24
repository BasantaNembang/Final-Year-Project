package com.enroll.config;

import feign.RequestInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Configuration
public class AuthFeignConfig {

    //RequestInterceptor a feign interceptor

    @Bean
    public RequestInterceptor requestInterceptor(){
       return requestTemplate -> {

           String URL = requestTemplate.path();
           if(URL.startsWith("/course/get")){
               return;
           }

           ServletRequestAttributes requestAttributes =
                   (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
           if(requestAttributes!=null){
               HttpServletRequest request = requestAttributes.getRequest();
               String authHeader = request.getHeader("Authorization");

               if(authHeader!=null){
                   requestTemplate.header("Authorization", authHeader);
               }
           }
       };

    }


}
