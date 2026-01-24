package com.course.service;

import com.course.dto.ResponseCourseDTO;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CourseService {

    ResponseCourseDTO saveCourse(MultipartFile video, MultipartFile image, String dto);

    List<ResponseCourseDTO> getAllCourses();

    UrlResource getImage(String imageName);

    String updateCourse(MultipartFile video, MultipartFile image, String dto, String cid, String uid);

    Boolean updateImage(MultipartFile image, String cid);

    String deleteCourse(String cid, String uid);

    Boolean checkCourse(String courseId);

    ResponseCourseDTO getCourseInfo(String courseId);

    List<ResponseCourseDTO> getAllCourseByCategory(String category);

    List<ResponseCourseDTO> getAllCourseByLevel(String level);

    List<ResponseCourseDTO> getAllCourseByPriceRange(int range);

    List<ResponseCourseDTO> searchByCourse(String name);
}
