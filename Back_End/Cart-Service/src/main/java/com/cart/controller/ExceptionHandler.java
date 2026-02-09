package com.cart.controller;


import com.cart.error.CartException;
import com.cart.error.ErrorDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandler {


    @org.springframework.web.bind.annotation.ExceptionHandler(CartException.class)
    public ResponseEntity<ErrorDTO> handelError(CartException exception){
        ErrorDTO dto = new ErrorDTO();
        dto.setMsg(exception.getMessage());
        dto.setFlag(false);
        dto.setHttpStatus(500);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(dto);
    }

}
