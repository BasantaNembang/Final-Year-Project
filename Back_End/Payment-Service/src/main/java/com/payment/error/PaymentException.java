package com.payment.error;

public class PaymentException extends RuntimeException{

    public PaymentException(){
        super("Error in Payment Service");
    }

    public PaymentException(String msg){
        super(msg);
    }


}
