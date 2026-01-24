package com.review.repo;

import com.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepo extends JpaRepository<Review, String> {


    List<Review> findALlByCourseId(String courseId);


}
