package com.payment.service;

import com.payment.dto.PaymentDto;
import com.payment.dto.PaymentRequestDto;

import java.util.List;

public interface PaymentService {

    String processPayment(PaymentRequestDto dto);

    List<PaymentDto> getALlPayment();

    PaymentDto getPaymentInfo(String pid);
}
