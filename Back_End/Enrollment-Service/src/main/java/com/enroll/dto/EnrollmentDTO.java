package com.enroll.dto;

import java.time.Instant;

public record EnrollmentDTO(String enroll_id,
                            String userId,
                            String courseId,
                            EnrollStatus status,
                            Instant enrolled_at,
                            String paymentId) {
}
