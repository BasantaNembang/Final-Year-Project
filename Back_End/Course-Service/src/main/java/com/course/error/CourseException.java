package com.course.error;

public class CourseException extends  RuntimeException{

    public CourseException(){
        super("Some error in Course-Service");
    }

    public CourseException(String msg){
        super(msg);
    }


}
