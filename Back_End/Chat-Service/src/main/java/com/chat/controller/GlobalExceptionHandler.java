package com.chat.controller;

import com.chat.dto.ErrorDTO;
import com.chat.error.ChatException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @org.springframework.web.bind.annotation.ExceptionHandler(ChatException.class)
    public ResponseEntity<ErrorDTO> handelError(ChatException exception){
        ErrorDTO dto = new ErrorDTO();
        dto.setMsg(exception.getMessage());
        dto.setFlag(false);
        dto.setHttpStatus(500);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(dto);
    }


}
