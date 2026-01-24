package com.review.dto;

import lombok.Builder;

import java.time.Instant;


@Builder
public record ReviewDTO(String rid,
                        String courseId,
                        String userId,
                        Instant time,
                        int rating,
                        String message) {
}
