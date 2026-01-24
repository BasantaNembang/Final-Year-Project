package com.chat.dto;

public record MessageDmRequest(String courseId,
                               String content,
                               String teacherId,
                               String studentId,
                               String username,
                               String courseName) {
}
