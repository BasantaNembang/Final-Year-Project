package com.course.reposistory;

import com.course.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseRepo extends MongoRepository<Course, String> {
}
