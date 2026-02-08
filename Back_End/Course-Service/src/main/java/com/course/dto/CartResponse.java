package com.course.dto;


import lombok.Builder;

@Builder
public record CartResponse(String courseName,
                           String teacherName,
                           String imageUrl,
                           Double price,
                           int duration) {
}

