package com.payment.service;

import com.payment.dto.PaymentDto;
import com.payment.dto.PaymentRequestDto;
import com.payment.dto.PaymentStatus;
import com.payment.entity.PaymentEntity;
import com.payment.error.PaymentException;
import com.payment.reposistory.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;


@Service
public class PaymentServiceImpel implements PaymentService {

    @Autowired
    PaymentRepo repo;

    @Override
    public  String processPayment(PaymentRequestDto dto){

        PaymentEntity payment = new PaymentEntity();

        //validate the cardNumber, cv, expiry date
        //call the payment->API

        payment.setPid(UUID.randomUUID().toString());

        payment.setAmount(dto.amount());
        payment.setMethod(dto.method());
        payment.setPaymentDate(Instant.now());
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setUserId(dto.userId());
        payment.setCourseId(dto.courseId());

        payment.setCardNumber(dto.cardNumber());
        payment.setCountyName(dto.countryName());
        payment.setMonthYear(dto.monthYear());
        payment.setCvNumber(dto.cvNumber());
        payment.setAccountName(dto.accountName());

        repo.save(payment);
        return payment.getPid();
    }


    @Override
    public PaymentDto getPaymentInfo(String pid) {
        return repo.findById(pid).
                map(m->new PaymentDto(m.getPid(), m.getAmount(), m.getPaymentDate(),
                        m.getStatus(), m.getMethod(), m.getCountyName(), m.getCardNumber(), m.getMonthYear(),
                        m.getCvNumber(), m.getAccountName()))
                .orElseThrow(()->new PaymentException("No such payment is found having the Id  "+ pid));
    }


    @Override
    public List<PaymentDto> getALlPayment() {
        return repo.findAll()
                .stream()
                .map(m->new PaymentDto(m.getPid(), m.getAmount(), m.getPaymentDate(),
                        m.getStatus(), m.getMethod(), m.getCountyName(), m.getCardNumber(), m.getMonthYear(),
                        m.getCvNumber(), m.getAccountName()))
                .toList();
    }



}
