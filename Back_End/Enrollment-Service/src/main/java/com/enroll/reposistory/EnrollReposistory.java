package com.enroll.reposistory;

import com.enroll.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface EnrollReposistory extends JpaRepository<Enrollment, String> {

    Optional<List<Enrollment>> findByUserIdAndCourseId(String userID, String courseID);

    //Optional<Enrollment> findByUserId(String userId);

    Optional<List<Enrollment>> findAllByUserId(String userId);
}
