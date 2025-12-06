package com.enroll.dto;

import lombok.Builder;

@Builder
public record EnrollmentResponse(String enroll_id,
                                 UserDtoResponse userDto) {
}



