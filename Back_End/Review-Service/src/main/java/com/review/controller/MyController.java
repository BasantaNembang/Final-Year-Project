package com.review.controller;


import com.review.dto.ReviewDTO;
import com.review.dto.ReviewResponse;
import com.review.service.ReviewServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
public class MyController {

    @Autowired
    private ReviewServiceImple serviceImple;

    @PostMapping("/do")
    @PreAuthorize("hasAnyRole('STUDENT')")
    public String getALlReview(@RequestBody ReviewDTO dto) {
        return serviceImple.doRatings(dto);
    }

    //find by course id
    @GetMapping("/get/{courseId}")
    public List<ReviewResponse> getALlReview(@PathVariable("courseId") String courseId) {
      return serviceImple.getALLReviews(courseId);
    }


}
