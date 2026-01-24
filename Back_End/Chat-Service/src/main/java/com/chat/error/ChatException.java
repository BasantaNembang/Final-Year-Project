package com.chat.error;

public class ChatException extends  RuntimeException{

    public ChatException(){
        super("Some error in Chat-Service");
    }

    public ChatException(String msg){
        super(msg);
    }


}
