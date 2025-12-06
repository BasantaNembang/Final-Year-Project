package com.enroll.external.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "COURSE-SERVICE")
public interface CourseService {

    @GetMapping("/course/check/{courseId}")
    public Boolean checkCourse(@PathVariable("courseId") String courseId);


}
