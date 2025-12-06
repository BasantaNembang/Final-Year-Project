package com.enroll.external.client;

import com.enroll.external.others.PaymentRequestDto;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class PaymentServiceImpl {

    private final PaymentService paymentService;

    public PaymentServiceImpl(PaymentService paymentService) {
        this.paymentService = paymentService;
    }


    public String paymentCourse(PaymentRequestDto dto){
        return paymentService.paymentCourse(dto);
    }


}
