package com.enroll.dto;

import com.enroll.external.others.PaymentMethod;

public record RequestDTO(String courseId,
                         String userId,
                         Double price,
                         PaymentMethod paymentMethod,

                         //payment stuffs  countyName
                         String countryName,
                         Long cardNumber,
                         String monthYear,
                         String cvNumber,
                         String accountName
                         ) {
}
