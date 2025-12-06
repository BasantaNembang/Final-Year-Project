package com.enroll.external.client;


import com.enroll.external.others.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "AUTH-SERVICE")
public interface AuthService {


    @PostMapping("/auth/info/{userId}")
    public UserDto userINFO(@PathVariable("userId") String userId);

}
