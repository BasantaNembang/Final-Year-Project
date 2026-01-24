package com.payment.controller;


import com.payment.dto.PaymentDto;
import com.payment.dto.PaymentRequestDto;
import com.payment.service.PaymentServiceImpel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentServiceImpel serviceImpel;

    @PostMapping("/process")
    @PreAuthorize("hasAnyRole('STUDENT')")
    public String paymentCourse(@RequestBody PaymentRequestDto dto) {
       return serviceImpel.processPayment(dto);
    }

    @GetMapping("/get/{pid}")
    @PreAuthorize("hasAnyRole('STUDENT') || hasAnyRole('TEACHER')")
    public PaymentDto getPaymentInfo(@PathVariable("pid") String pid){
        return serviceImpel.getPaymentInfo(pid);
    }

    @PreAuthorize("hasAnyRole('STUDENT') || hasAnyRole('TEACHER')")
    @GetMapping("/get-all")
    public List<PaymentDto> getAllPayment() {
        return serviceImpel.getALlPayment();
    }

}

