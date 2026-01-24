package com.enroll.external.client;

import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl {

    private final AuthService authService;

    public AuthServiceImpl(AuthService authService) {
        this.authService = authService;
    }

    public String isPresent(String userId){
        return authService.isPresent(userId);
    }





}
