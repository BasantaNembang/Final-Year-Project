package com.auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/v2")
public class SecureController {


    @GetMapping("/data")
    public String getResources(){
        return "Hey there Java";
    }




}
