package com.auth.controller;


import com.auth.dto.ErrorDTO;
import com.auth.error.AuthException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandler {


    @org.springframework.web.bind.annotation.ExceptionHandler(AuthException.class)
    public ResponseEntity<ErrorDTO> handelException(AuthException exception){
        ErrorDTO dto = new ErrorDTO();
        dto.setFlag(false);
        dto.setMsg(exception.getMessage());
        dto.setHttpStatus(exception.getHttpStatus());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(dto);
    }


}
