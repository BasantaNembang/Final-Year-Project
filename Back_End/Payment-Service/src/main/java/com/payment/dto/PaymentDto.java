package com.payment.dto;

import java.time.Instant;

public record PaymentDto(String pid,
         Double amount,
         Instant paymentDate,
         PaymentStatus status,
         PaymentMethod method,

                         String countyName,
                         Long cardNumber,
                         String monthYear,
                         String cvNumber,
                         String accountName
                         ) {
}
