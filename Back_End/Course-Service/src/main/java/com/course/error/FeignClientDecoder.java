package com.course.error;

import com.course.dto.ErrorDTO;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import feign.Response;
import feign.codec.ErrorDecoder;

import java.nio.charset.StandardCharsets;

public class FeignClientDecoder implements ErrorDecoder {


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
                return new CourseException(dto.getMsg());
            }else{
                //service is unavailable
                return new CourseException(body);
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new CourseException(e.getMessage());
        }
    }



}
