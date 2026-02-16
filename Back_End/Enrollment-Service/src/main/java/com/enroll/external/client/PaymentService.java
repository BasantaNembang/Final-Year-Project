package com.enroll.external.client;


import com.enroll.external.others.PaymentRequestDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "payment-service", url = "${payment-service.url}")
public interface PaymentService {

    @PostMapping("/payment/process")
    public String paymentCourse(@RequestBody PaymentRequestDto dto);

}
