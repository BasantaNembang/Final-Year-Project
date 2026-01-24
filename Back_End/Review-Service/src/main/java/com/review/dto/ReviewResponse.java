package com.review.dto;

import lombok.Builder;

import java.time.Instant;

@Builder
public record ReviewResponse(String rid,
                             String courseId,
                             String userName,
                             Instant time,
                             int rating,
                             String message) {
}
