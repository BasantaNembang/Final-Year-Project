package com.course.config;


import feign.RequestInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Configuration
public class AuthFeignConfig {


    @Bean
    public RequestInterceptor requestInterceptor(){
        return requestTemplate -> {

            String url = requestTemplate.path();
            if(url.startsWith("/category/get")){
                return; //no need to attach jwt
            }

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
