package com.course.Controller;


import com.course.dto.ResponseCourseDTO;
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


    //token having role : TEACHER
    @PostMapping("/save")
    @PreAuthorize("hasAnyRole('TEACHER')")
    public ResponseEntity<ResponseCourseDTO> saveCourse(@RequestPart(value = "video", required = false) MultipartFile video,
                                                        @RequestPart(value ="image", required = false) MultipartFile image,
                                                        @RequestPart("dto") String dto){
        return ResponseEntity.status(HttpStatus.OK).body(repo.saveCourse(video, image, dto));
    }

    //get all courses
    @GetMapping("/get-all")
    public ResponseEntity<List<ResponseCourseDTO>> getALlCourses(){
        return ResponseEntity.status(HttpStatus.OK).body(repo.getAllCourses());
    }

    //get courses by ID
    @GetMapping("/get/{courseId}")
    public ResponseCourseDTO getCourseINFO(@PathVariable("courseId") String courseId){
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
    @PutMapping("/update/{cid}")
    @PreAuthorize("hasAnyRole('TEACHER')")
    public ResponseEntity<String>  updateCourse(@RequestPart(value = "video", required = false) MultipartFile video,
                                                           @RequestPart(value ="image", required = false) MultipartFile image,
                                                           @RequestPart("dto") String dto,
                                                           @PathVariable("cid") String cid,
                                                           @RequestParam("uid") String uid){
        return ResponseEntity.status(HttpStatus.OK).body(repo.updateCourse(video, image, dto, cid, uid));
    }



    @DeleteMapping("/delete/{cid}")
    @PreAuthorize("hasAnyRole('TEACHER')")
    public ResponseEntity<String> deleteCourse(@PathVariable("cid") String cid,
                                               @RequestParam("uid") String uid){
        return ResponseEntity.status(HttpStatus.OK).body(repo.deleteCourse(cid, uid));
    }


    @GetMapping("/check/{courseId}")
    @PreAuthorize("hasAnyRole('STUDENT') || hasAnyRole('TEACHER')")
    public Boolean checkCourse(@PathVariable("courseId") String courseId){
        return repo.checkCourse(courseId);
    }


    @GetMapping("/get/category/{category}")
    public ResponseEntity<List<ResponseCourseDTO>> getAllCourseByCategory(@PathVariable("category")
                                                                          String category){
        return ResponseEntity.status(HttpStatus.OK).body(repo.getAllCourseByCategory(category));
    }


    @GetMapping("/get/level/{level}")
    public ResponseEntity<List<ResponseCourseDTO>> getAllCourseByLevel(@PathVariable("level")
                                                                          String level){
        return ResponseEntity.status(HttpStatus.OK).body(repo.getAllCourseByLevel(level));
    }

    @GetMapping("/get/price/{range}")
    public ResponseEntity<List<ResponseCourseDTO>> getAllCourseByPriceRange(@PathVariable("range")
                                                                       int range){
        return ResponseEntity.status(HttpStatus.OK).body(repo.getAllCourseByPriceRange(range));
    }

    @GetMapping("/get/query/{name}")
    public ResponseEntity<List<ResponseCourseDTO>> searchByCourse(@PathVariable("name")
                                                                            String name){
        return ResponseEntity.status(HttpStatus.OK).body(repo.searchByCourse(name));
    }



}
