package com.enroll.service;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class JwtService {

    public String getToken(){
        RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        if(attributes instanceof ServletRequestAttributes requestAttributes){
            HttpServletRequest http = requestAttributes.getRequest();
            String authHeader = http.getHeader("Authorization");
            if(authHeader!=null && authHeader.startsWith("Bearer ")){
                return authHeader.substring(7);
            }
        }
        return null;
    }


}

