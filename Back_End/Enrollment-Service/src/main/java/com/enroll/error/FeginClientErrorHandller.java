package com.enroll.error;


import com.enroll.dto.ErrorDTO;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import feign.Response;
import feign.codec.ErrorDecoder;

import java.nio.charset.StandardCharsets;


//its only execute when the response http status is not 200....
//it will not execute in network fail, only in HTTP response
public class FeginClientErrorHandller implements ErrorDecoder {


    @Override
    public Exception decode(String s, Response response) {
        try{
            //response can only be read once`s
           String  body =  new String(response.body().asInputStream().readAllBytes(), StandardCharsets.UTF_8);
           //StandardCharsets.UTF_8 is a required when converting data from input-stream to string
           if(body.trim().startsWith("{")){
               //json body coming from microservices
               ObjectMapper mapper = new ObjectMapper();
               mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
               ErrorDTO dto = mapper.readValue(body, ErrorDTO.class);
               return new EnrollmentException(dto.getMsg());
           }else{
               //service is unavailable
               return new EnrollmentException(body);
           }

        } catch (Exception e) {
            e.printStackTrace();
            throw new EnrollmentException(e.getMessage());
        }
    }



}
