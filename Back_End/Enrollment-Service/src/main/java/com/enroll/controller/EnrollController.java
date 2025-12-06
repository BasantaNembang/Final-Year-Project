package com.enroll.controller;


import com.enroll.dto.EnrollResponseDTO;
import com.enroll.dto.RequestDTO;
import com.enroll.service.EnrollServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/enroll")
public class EnrollController {

    @Autowired
    private EnrollServiceImp serviceImp;

    //having role STUDENT

    @PostMapping("/course")
    //@PreAuthorize("hasAnyRole('STUDENT')")
    public ResponseEntity<EnrollResponseDTO> enrollCourse(@RequestBody RequestDTO dto ){
        EnrollResponseDTO response = serviceImp.enrollCourse(dto);
        if("ENROLL-SUCCESS".equals(response.msg())){
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else if ("PAYMENT FAIL - RETRY".equals(response.msg())) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAllEnrollmentCourse(){
        return ResponseEntity.status(HttpStatus.OK).body(serviceImp.getAllEnrollmentCourse());
   }


    @GetMapping("/get/{enrollId}")
    public ResponseEntity<?> getEnrollmentINFO(@PathVariable("enrollId") String enrollId){
        return ResponseEntity.status(HttpStatus.OK).body(serviceImp.getEnrollmentInfo(enrollId));
   }


}
