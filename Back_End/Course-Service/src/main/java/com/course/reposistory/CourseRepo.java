package com.course.reposistory;

import com.course.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CourseRepo extends MongoRepository<Course, String> {

    Optional<Course> findByAuthor(String uid);


}
