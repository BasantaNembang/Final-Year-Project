package com.course.service;

import com.course.dto.CourseDTO;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CourseService {

    CourseDTO saveCourse(MultipartFile video, MultipartFile image, String dto);

    List<CourseDTO> getAllCourses();

    UrlResource getImage(String imageName);

    CourseDTO updateCourse(MultipartFile video, MultipartFile image, String dto);

    Boolean updateImage(MultipartFile image, String cid);

    String deleteCourse(String cid);

    Boolean checkCourse(String courseId);

    CourseDTO getCourseInfo(String courseId);
}
