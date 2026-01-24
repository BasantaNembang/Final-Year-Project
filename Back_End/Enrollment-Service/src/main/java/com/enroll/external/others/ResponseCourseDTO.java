package com.enroll.external.others;

import lombok.Builder;

import java.time.Instant;
import java.util.List;

@Builder
public record ResponseCourseDTO(String course_id, String author, String description, String level,
                                int time, String thumbnail_url, Instant create_at, String stream_id,
                                Double price, List<String> objectives, List<String> requirements,
                                String authorId,CategoryResponseDTO categoryResponseDTO) {

}
