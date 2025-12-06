package com.enroll.external.client;


import org.springframework.stereotype.Service;


@Service
public class CourseServiceImpl {

    private final CourseService courseService;

    public CourseServiceImpl(CourseService courseService) {
        this.courseService = courseService;
    }

    //@CircuitBreaker(name = "external", fallbackMethod = "fallBackCheckCourse")
    public Boolean checkCourse(String courseId){
        return courseService.checkCourse(courseId);
    }

//    public Boolean fallBackCheckCourse(String courseId, Throwable throwable){
//        System.out.println("Calling the FallBack method of CheckCourse  ::");
//        throw new EnrollmentException(throwable.getMessage());
//    }




}
