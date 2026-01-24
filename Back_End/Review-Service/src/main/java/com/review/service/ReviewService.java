package com.review.service;

import com.review.dto.ReviewDTO;
import com.review.dto.ReviewResponse;

import java.util.List;

public interface ReviewService {
    List<ReviewResponse> getALLReviews(String courseId);

    String doRatings(ReviewDTO dto);
}
