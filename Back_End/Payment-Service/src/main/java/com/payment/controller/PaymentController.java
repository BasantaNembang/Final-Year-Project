package com.payment.controller;


import com.payment.dto.PaymentDto;
import com.payment.dto.PaymentRequestDto;
import com.payment.service.PaymentServiceImpel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentServiceImpel serviceImpel;

    @PostMapping("/process")
    public String paymentCourse(@RequestBody PaymentRequestDto dto) {
        System.out.println("Bebe");
        System.out.println(dto);
       return serviceImpel.processPayment(dto);
    }

    @GetMapping("/get/{pid}")
    public PaymentDto getPaymentInfo(@PathVariable("pid") String pid){
        return serviceImpel.getPaymentInfo(pid);
    }

    @GetMapping("/get-all")
    public List<PaymentDto> getAllPayment() {
        return serviceImpel.getALlPayment();
    }

}

