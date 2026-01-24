package com.enroll.service;

import com.enroll.dto.EnrollResponseDTO;
import com.enroll.dto.EnrollmentDTO;
import com.enroll.dto.EnrollmentResponse;
import com.enroll.dto.RequestDTO;

import java.util.List;

public interface EnrollService {

    EnrollResponseDTO enrollCourse(RequestDTO dto);

    List<EnrollmentDTO> getAllEnrollmentCourse();

    List<EnrollmentResponse> getEnrolledCourseByUSER(String userId);
}
