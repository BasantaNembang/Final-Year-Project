package com.enroll.error;

public class EnrollmentException extends RuntimeException{

    public EnrollmentException(){
        super("Some Error in Enrollment-Service");
    }

    public EnrollmentException(String msg){
        super(msg);
    }



}
