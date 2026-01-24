package com.enroll.external.client;


import com.enroll.config.AuthFeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "AUTH-SERVICE", configuration = AuthFeignConfig.class)
public interface AuthService {


    @PostMapping("/auth/info/{userId}")
    public String isPresent(@PathVariable("userId") String userId);


}
