package com.enroll.external.client;

import com.enroll.external.others.UserDto;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl {

    private final AuthService authService;

    public AuthServiceImpl(AuthService authService) {
        this.authService = authService;
    }

    public UserDto userINFO(String userId){
        return authService.userINFO(userId);
    }





}
