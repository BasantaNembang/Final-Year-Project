package com.course.Controller;

import com.course.dto.ErrorDTO;
import com.course.error.CourseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @org.springframework.web.bind.annotation.ExceptionHandler(CourseException.class)
    public ResponseEntity<ErrorDTO> handelError(CourseException exception){
        ErrorDTO dto = new ErrorDTO();
        dto.setMsg(exception.getMessage());
        dto.setFlag(false);
        dto.setHttpStatus(500);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(dto);
    }


}
