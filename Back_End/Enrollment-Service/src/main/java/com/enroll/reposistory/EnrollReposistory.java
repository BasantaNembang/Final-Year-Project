package com.enroll.reposistory;

import com.enroll.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollReposistory extends JpaRepository<Enrollment, String> {

    Optional<List<Enrollment>> findByUserIdAndCourseId(String userID, String courseID);


}
