package com.enroll.controller;

import com.enroll.dto.ErrorDTO;
import com.enroll.error.EnrollmentException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EnrollmentException.class)
    public ResponseEntity<ErrorDTO> responseEntity(EnrollmentException exception){
        ErrorDTO dto = new ErrorDTO();
        dto.setFlag(false);
        dto.setMsg(exception.getMessage());
        dto.setHttpStatus(500);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(dto);
    }


}
