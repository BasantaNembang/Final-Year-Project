package com.course.dto;


import lombok.Builder;

import java.time.Instant;
import java.util.List;

@Builder
public record RequestCourseDTO(String course_id, String author, String description, Difficulty level,
                               int time, String thumbnail_url, Instant create_at, String stream_id,
                               Double price, String category, String title, List<String> objectives, List<String> requirements
                               ) {
}
