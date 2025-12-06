package com.payment.controller;


import com.payment.dto.ErrorDTO;
import com.payment.error.PaymentException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PaymentGlobalExceptionHandel {


    @ExceptionHandler(PaymentException.class)
    public ResponseEntity<ErrorDTO> handelError(PaymentException exception){
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setFlag(false);
        errorDTO.setHttpStatus(500);
        errorDTO.setMsg(exception.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDTO);
    }



}
