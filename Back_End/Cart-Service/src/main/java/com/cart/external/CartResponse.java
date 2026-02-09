package com.cart.external;


import lombok.Builder;

@Builder
public record CartResponse(String cartId,
                           String courseName,
                           String teacherName,
                           String imageUrl,
                           Double price,
                           int duration,
                           String courseId) {
}

