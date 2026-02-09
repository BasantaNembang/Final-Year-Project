package com.cart.error;

public class CartException extends RuntimeException{

    public CartException(){
        super("some-thing went wrong in cart-service");
    }

    public CartException(String msg){
      super(msg);
    }

}
