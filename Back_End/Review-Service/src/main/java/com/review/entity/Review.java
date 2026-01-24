package com.review.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Review {

    @Id
    private String rid;

    @Column(name = "course_id")
    private String courseId;

    private String username;

    private Instant time;

    private int rating;

    private String message;

}
