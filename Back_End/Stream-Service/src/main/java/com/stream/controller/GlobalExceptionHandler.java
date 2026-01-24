package com.stream.controller;

import com.stream.error.ErrorDto;
import com.stream.error.StreamException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(StreamException.class)
    public ResponseEntity<ErrorDto> handelError(StreamException exception){
        ErrorDto errorDto = new ErrorDto();
        errorDto.setMsg(exception.getMessage());
        errorDto.setFlag(false);
        errorDto.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDto);
    }


}
