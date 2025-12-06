package com.course.service;

import com.course.dto.CourseDTO;
import com.course.error.CourseException;
import com.course.external.client.CategoryServiceImp;
import com.course.external.client.StreamServiceImp;
import com.course.external.others.CategoryDTO;
import com.course.model.Course;
import com.course.reposistory.CourseRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class CourseServiceImp implements CourseService {

    @Autowired
    private CourseRepo repo;

    @Autowired
    private CategoryServiceImp categoryServiceImp;

    @Autowired
    private StreamServiceImp streamServiceImp;

    final String basePath = "http://localhost:8084/course/";

    public CourseDTO saveCourse(MultipartFile video, MultipartFile image, String dto) {

        String courseID = UUID.randomUUID().toString().substring(0, 8);
        ObjectMapper mapper = new ObjectMapper();
        CourseDTO courseDTO;
        try {
            courseDTO = mapper.readValue(dto, CourseDTO.class);
        } catch (Exception e) {
            throw new RuntimeException("Error in converting object  " + e.getMessage());
        }
        CategoryDTO categoryDTO0 = new CategoryDTO(0, courseDTO.category(), courseDTO.title(), courseID);

        //call category-service
        Boolean flag;
        try {
            flag = categoryServiceImp.saveCategory(categoryDTO0);
        } catch (Exception e) {
            e.printStackTrace();
            throw new CourseException("Error in saving category   ::" + e.getMessage());
        }

        if (!flag) {
            throw new CourseException("Some thing went wrong in Category-Service");
        }

        //call stream-service
        String StreamID;
        try {
            StreamID = streamServiceImp.saveVideo(video);
        } catch (Exception e) {
            e.printStackTrace();
            throw new CourseException("Error in stream-service  " + e.getMessage());
        }


        //save the image
        String imageName = image.getOriginalFilename() + "_" + System.currentTimeMillis();

        Path dir = Paths.get(System.getProperty("user.dir"), "Images");
        if (!Files.exists(dir)) {
            try {
                Files.createDirectories(dir);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        Course finalCourse = null;
        try {
            //saving the Image
            Path path = dir.resolve(imageName);
            Files.copy(image.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            Course course = Course.builder()
                    .course_id(courseID)
                    .title(courseDTO.title())
                    .author(courseDTO.author())
                    .price(courseDTO.price())
                    .time(courseDTO.time())
                    .create_at(Instant.now())
                    .level(courseDTO.level())
                    .thumbnail_url(basePath + "Images/" + imageName)
                    .stream_id(StreamID)
                    .description(courseDTO.description())
                    .objectives(courseDTO.objectives())
                    .requirements(courseDTO.requirements())
                    .build();
            finalCourse = repo.save(course);
        } catch (IOException e) {
            throw new RuntimeException("Error while saving image  " + e.getMessage());
        }

        return CourseDTO.builder()
                .course_id(finalCourse.getCourse_id())
                .author(finalCourse.getAuthor())
                .price(finalCourse.getPrice())
                .time(finalCourse.getTime())
                .create_at(finalCourse.getCreate_at())
                .level(finalCourse.getLevel())
                .thumbnail_url(finalCourse.getThumbnail_url())
                .stream_id(finalCourse.getStream_id())
                .description(finalCourse.getDescription())
                .objectives(finalCourse.getObjectives())
                .requirements(finalCourse.getRequirements())
                .build();
    }


    @Override
    public List<CourseDTO> getAllCourses() {
        List<Course> courses = repo.findAll();
        return courses.stream().map(c->
                new CourseDTO(c.getCourse_id(), c.getAuthor(), c.getTitle(), c.getDescription(),
                        c.getLevel(), c.getTime(), c.getThumbnail_url(), c.getCreate_at(), c.getStream_id(),
                        c.getPrice(), c.getCategory(), c.getObjectives(), c.getRequirements()))
                .toList();
    }



    @Override
    public UrlResource getImage(String imageName) {

        Path dir = Paths.get(System.getProperty("user.dir"), "Images");

        Path path = dir.resolve(imageName);

        UrlResource urlResource = null;
        try {
            urlResource = new UrlResource(path.toUri());
        } catch (Exception e) {throw new RuntimeException(e);}

        if(urlResource == null){
           throw new CourseException("No image found!!!");
        }
        return urlResource;
    }

    @Override
    public CourseDTO updateCourse(MultipartFile video, MultipartFile image, String dto) {

        ObjectMapper mapper = new ObjectMapper();
        CourseDTO courseDTO;
        try {
            courseDTO = mapper.readValue(dto, CourseDTO.class);
        } catch (Exception e) {
            throw new RuntimeException("Error in converting object  " + e.getMessage());
        }

        //check if video is present or not
        Boolean flag = null;
        if(video!=null){  //call Stream-Service
           flag = streamServiceImp.updateVideo(video, courseDTO.stream_id());
        }
        if(Boolean.FALSE.equals(flag)){
            throw new CourseException("Some error while saving the VIDEO!!");
        }

        //for image
        Boolean flag0 = null;
        if(image!=null){  //update Image
            flag0 = updateImage(image, courseDTO.course_id());
        }
        if(Boolean.FALSE.equals(flag0)){
            throw new CourseException("Some error while saving the IMAGE!!");
        }

        //now change the courseINFO
        Course finalCourse = null;
        Course course = Course.builder()
                .title(courseDTO.title())
                .description(courseDTO.description())
                .level(courseDTO.level())
                .time(courseDTO.time())
                .thumbnail_url(courseDTO.thumbnail_url())
                .create_at(courseDTO.create_at())
                .stream_id(courseDTO.stream_id())
                .price(courseDTO.price())
                .category(courseDTO.category())
                .objectives(courseDTO.objectives())
                .requirements(courseDTO.requirements())
                .build();
        finalCourse = repo.save(course);

        return CourseDTO.builder()
                .course_id(finalCourse.getCourse_id())
                .author(finalCourse.getAuthor())
                .price(finalCourse.getPrice())
                .time(finalCourse.getTime())
                .create_at(finalCourse.getCreate_at())
                .level(finalCourse.getLevel())
                .thumbnail_url(finalCourse.getThumbnail_url())
                .stream_id(finalCourse.getStream_id())
                .description(finalCourse.getDescription())
                .objectives(finalCourse.getObjectives())
                .requirements(finalCourse.getRequirements())
                .build();
    }


    @Override
    @Transactional
    public Boolean updateImage(MultipartFile image, String cid) {
        Course course = repo.findById(cid)
                .orElseThrow(()->new CourseException("Error while updating Image(Thumbnail)"));
        String imageName = image.getOriginalFilename() + "_" + System.currentTimeMillis();
        //update the image here
        String url =  course.getThumbnail_url();
        //'http://localhost:8084/course/Images/20220619_074143.jpg_1760860650999',
        String[] parts = url.split("/");
        //['http', '', 'localhost:8084','course','Images','20220619_074143.jpg_1760860650999' ]
        //System.out.println(Arrays.toString(parts));
        String lastPart = parts[5];

        Path dir = Paths.get(System.getProperty("user.dir"), "Images");

        Path path = dir.resolve(lastPart);
        //delete the old ONE
        try{
          Files.delete(path);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        //place the new one and save in DB
        Path updatedPath = dir.resolve(imageName);
        try{
            Files.copy(image.getInputStream(), updatedPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        course.setThumbnail_url(basePath + "Images/" + imageName);
        repo.save(course); //DB
        return true;
    }



    @Override
    public String deleteCourse(String cid) {
        repo.deleteById(cid);
        return "successfully delete the course having the id  :: " + cid;
    }


    @Override
    public Boolean checkCourse(String courseId) {
      return repo.findById(courseId)
              .map(r->true)
              .orElseThrow(()->new CourseException("no such course is present "));
    }


    @Override
    public CourseDTO getCourseInfo(String courseId) {
        return repo.findById(courseId)
                .map(m->CourseDTO.builder()
                        .course_id(m.getCourse_id())
                        .author(m.getAuthor())
                        .price(m.getPrice())
                        .time(m.getTime())
                        .create_at(m.getCreate_at())
                        .level(m.getLevel())
                        .thumbnail_url(m.getThumbnail_url())
                        .stream_id(m.getStream_id())
                        .description(m.getDescription())
                        .objectives(m.getObjectives())
                        .requirements(m.getRequirements())
                        .build())
                .orElseThrow(()->new CourseException("no such course is present having the id  :: " + courseId));
    }


}


