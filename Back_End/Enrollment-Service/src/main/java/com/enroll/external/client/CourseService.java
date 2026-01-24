package com.enroll.external.client;

import com.enroll.config.AuthFeignConfig;
import com.enroll.external.others.ResponseCourseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "COURSE-SERVICE", configuration = AuthFeignConfig.class)
public interface CourseService {

    @GetMapping("/course/check/{courseId}")
    public Boolean checkCourse(@PathVariable("courseId") String courseId);


    @GetMapping("/course/get/{courseId}")
    public ResponseCourseDTO getCourseINFO(@PathVariable("courseId") String courseId);


}
