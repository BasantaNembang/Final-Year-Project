package com.course.Controller;


import com.course.dto.CourseDTO;
import com.course.service.CourseServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    private CourseServiceImp repo;


    //token having role : MENTOR
    @PostMapping("/save")
    //@PreAuthorize("hasAnyRole('MENTOR')")
    public ResponseEntity<CourseDTO> saveCourse(@RequestPart(value = "video", required = false) MultipartFile video,
                                                @RequestPart(value ="image", required = false) MultipartFile image,
                                                @RequestPart("dto") String dto){
        return ResponseEntity.status(HttpStatus.OK).body(repo.saveCourse(video, image, dto));
    }

    //get all courses
    @GetMapping("/get-all")
//    @PreAuthorize("hasAnyRole('STUDENT') || hasAnyRole('Admin')") TEACHER
//    @PreAuthorize("hasAnyRole('STUDENT')")
    public ResponseEntity<List<CourseDTO>> getALlCourses(){
        return ResponseEntity.status(HttpStatus.OK).body(repo.getAllCourses());
    }

    //get courses by ID
    @GetMapping("/get/{courseId}")
    public CourseDTO getCourseINFO(@PathVariable("courseId") String courseId){
        return repo.getCourseInfo(courseId);
    }

    //for image
    @GetMapping("/Images/{imageName}")
    public ResponseEntity<UrlResource> getImages(@PathVariable("imageName") String imageName){
        UrlResource image = repo.getImage(imageName);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("image/jpeg"))
                .body(image);
    }


    //for updating the course
    @PutMapping("/update")
    public ResponseEntity<CourseDTO>  updateCourse(@RequestPart(value = "video", required = false) MultipartFile video,
                                                @RequestPart(value ="image", required = false) MultipartFile image,
                                                @RequestPart("dto") String dto){
        return ResponseEntity.status(HttpStatus.OK).body(repo.updateCourse(video, image, dto));
    }


    @DeleteMapping("/delete/{cid}")
   // @PreAuthorize("hasAnyRole('MENTOR')")
    public ResponseEntity<String> deleteCourse(@PathVariable("cid") String cid){
        return ResponseEntity.status(HttpStatus.OK).body(repo.deleteCourse(cid));
    }

    @GetMapping("/check/{courseId}")
    public Boolean checkCourse(@PathVariable("courseId") String courseId){
        return repo.checkCourse(courseId);
    }



}
