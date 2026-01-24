package com.enroll.dto;

import com.enroll.external.others.ResponseCourseDTO;
import lombok.Builder;


@Builder
public record EnrollmentResponse(String enroll_id,
                                 String userId,
//get the course DTO
ResponseCourseDTO courseDto
) {
}
