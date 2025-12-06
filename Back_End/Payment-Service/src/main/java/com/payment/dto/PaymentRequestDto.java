package com.payment.dto;

public record PaymentRequestDto(
        String userId,
        String courseId,
        Double amount,
        PaymentMethod method,

        String countryName,
        Long cardNumber,
        String monthYear,
        String cvNumber,
        String accountName
        ) {
}

