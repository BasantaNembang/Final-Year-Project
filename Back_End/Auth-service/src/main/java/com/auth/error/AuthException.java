package com.auth.error;

public class AuthException extends RuntimeException{

    private int httpStatus;

    public AuthException(){
        super("Error in Auth-Service  ");
    }

    public AuthException(String msg){
        super(msg);
    }

    public AuthException(String msg, int httpStatus){
        super(msg);
        this.httpStatus=httpStatus;
    }

    public int getHttpStatus(){
        return httpStatus;
    }

}
