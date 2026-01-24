package com.enroll.dto;

import java.util.List;

public record CourseDto(String title,
                        String imageUrl,
                        int time,
                        String author,
                        Double price,
                        String level,
                        String introduction,
                        List<String> objectives,
                        List<String> requirements

) {
}

