package com.payment.entity;

import com.payment.dto.PaymentMethod;
import com.payment.dto.PaymentStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Payment")
public class PaymentEntity {

    @Id
    private String pid;

    private Double amount;
    private Instant paymentDate;
    private PaymentStatus status;
    private PaymentMethod method;
    private String userId;
    private String courseId;

    //newly added
    private String countyName;
    private Long cardNumber;
    private String monthYear;
    private String cvNumber;
    private String accountName;

}
