package com.course.dto;

import lombok.Builder;

import java.time.Instant;
import java.util.List;

@Builder
public record CourseDTO(String course_id, String author,String title, String description, Difficulty level,
                        int time, String thumbnail_url, Instant create_at, String stream_id,
                        Double price, String category, List<String> objectives, List<String> requirements) {
}
