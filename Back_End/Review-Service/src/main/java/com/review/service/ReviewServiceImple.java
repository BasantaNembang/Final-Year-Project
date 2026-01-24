package com.review.service;


import com.review.dto.ReviewDTO;
import com.review.dto.ReviewResponse;
import com.review.entity.Review;
import com.review.repo.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImple implements ReviewService{

    @Autowired
    private ReviewRepo repo;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${auth-service.url}")
    private String authURL;


    @Override
    public List<ReviewResponse> getALLReviews(String courseId) {
       return  repo.findALlByCourseId(courseId)
               .stream()
               .map(m->new ReviewResponse(m.getRid(), m.getCourseId(), m.getUsername(),
                       m.getTime(), m.getRating(), m.getMessage()))
               .collect(Collectors.toList());
    }


    @Override
    public String doRatings(ReviewDTO dto) {
        Review review = new Review();

        review.setRid(UUID.randomUUID().toString());
        review.setCourseId(dto.courseId());
        review.setRating(dto.rating());
        review.setMessage(dto.message());
        review.setTime(Instant.now());

        try{
        String userName = restTemplate.getForObject(authURL+"/user/"+dto.userId(), String.class);
           review.setUsername(userName);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        repo.save(review);
        System.out.println("review saved.........." + review);
        return "success";
    }


}

