package com.stream.error;



public class StreamException extends RuntimeException{

    public StreamException(){
      super("Some-thing went wrong in Stream-Service");
    }

    public StreamException(String msg){
        super(msg);
        }

}
