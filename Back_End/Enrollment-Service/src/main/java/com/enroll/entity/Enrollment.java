package com.enroll.entity;


import com.enroll.dto.EnrollStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Enrollment {

    @Id
    private String enroll_id;

    @Column(name = "user_id")
    private String userId;  //having roll STUDENT

    @Column(name = "course_id")
    private String courseId;

    private EnrollStatus status;
    //private int completed_percentage; cache the percentage in a browser
    private Instant enrolled_at;
    private String paymentId;

}
