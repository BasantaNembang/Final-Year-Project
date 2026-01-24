package com.course.dto;

import com.course.external.others.CategoryResponseDTO;
import lombok.Builder;

import java.time.Instant;
import java.util.List;

@Builder
public record ResponseCourseDTO(String course_id, String author, String description, Difficulty level,
                                int time, String thumbnail_url, Instant create_at, String stream_id,
                                Double price, List<String> objectives, List<String> requirements,
                                String authorId, CategoryResponseDTO categoryResponseDTO) {

}
