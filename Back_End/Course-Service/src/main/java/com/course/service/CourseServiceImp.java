package com.course.service;

import com.course.dto.Difficulty;
import com.course.dto.RequestCourseDTO;
import com.course.dto.ResponseCourseDTO;
import com.course.error.CourseException;
import com.course.event.StreamDTO;
import com.course.external.client.CategoryServiceImp;
import com.course.external.client.StreamServiceImp;
import com.course.external.others.CategoryDTO;
import com.course.external.others.TeacherDto;
import com.course.model.Course;
import com.course.reposistory.CourseRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import feign.RetryableException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CourseServiceImp implements CourseService {

    @Autowired
    private CourseRepo repo;

    @Autowired
    private CategoryServiceImp categoryServiceImp;

    @Autowired
    private StreamServiceImp streamServiceImp;

    @Autowired
    private RestTemplate restTemplate;

    final String basePath = "http://localhost:9090/course/";

    @Value("${auth-service.url}")
    private String authServiceURL;

    @Autowired
    private KafkaTemplate<String, StreamDTO> kafkaTemplate;

    @Value("${stream.topic}")
    private String steamTopic;

    @Value("${video.upload.dir}")
    private String videoUploadDIR;


    public ResponseCourseDTO saveCourse(MultipartFile video, MultipartFile image, String dto) {

        String courseID = UUID.randomUUID().toString().substring(0, 8);
        ObjectMapper mapper = new ObjectMapper();
        RequestCourseDTO courseDTO;
        try {
            courseDTO = mapper.readValue(dto, RequestCourseDTO.class);
        } catch (Exception e) {
            throw new RuntimeException("Error in converting object  " + e.getMessage());
        }
        CategoryDTO categoryDTO0 = new CategoryDTO(courseDTO.category(), courseDTO.title(), courseID);

        //call category-service
        String categoryId;
        try {
            categoryId = categoryServiceImp.saveCategory(categoryDTO0);
        } catch (RetryableException e) {
            e.printStackTrace();
            throw new CourseException("category-service is down please try latery");
        }

        if (categoryId == null) {
            throw new CourseException("Some thing went wrong in Category-Service");
        }

        //process video
        String StreamID =  sendToStreamAndProcessVideo(video);

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
                    .category(categoryId)
                    .build();
            finalCourse = repo.save(course);
        } catch (IOException e) {
            throw new RuntimeException("Error while saving image  " + e.getMessage());
        }

        return ResponseCourseDTO.builder()
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


    private String sendToStreamAndProcessVideo(MultipartFile video)  {
        String sID = UUID.randomUUID().toString();

        String file_path = null;
        try{
        //create a dir so that it can be share by course and stream-service
        Path uploadPath = Paths.get(videoUploadDIR);
        Files.createDirectories(uploadPath);

        Path filePath = uploadPath.resolve(sID + ".mp4");

        file_path =  String.valueOf(filePath);
        Files.copy(video.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("video saved");
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }


        try{
        StreamDTO streamDTO = new StreamDTO();
        streamDTO.setStreamId(sID);
        streamDTO.setMessage("process the video");
        streamDTO.setFilePath(file_path);

        kafkaTemplate.send(steamTopic, streamDTO);
        System.out.println("kafka message send");}
        catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return sID;
    }


    @Override
    public List<ResponseCourseDTO> getAllCourses() {
        List<Course> courses = repo.findAll();
        return courses.stream()
                .map(m -> new ResponseCourseDTO(m.getCourse_id(),
                        m.getAuthor(),
                        m.getDescription(),
                        m.getLevel(),
                        m.getTime(),
                        m.getThumbnail_url(),
                        m.getCreate_at(),
                        m.getStream_id(),
                        m.getPrice(),
                        // m.getCategory(),
                        m.getObjectives(),
                        m.getRequirements(),
                        m.getAuthor(),
                        categoryServiceImp.getSubCategoryInfo(m.getCategory())
                )).toList();
    }


    @Override
    public UrlResource getImage(String imageName) {

        Path dir = Paths.get(System.getProperty("user.dir"), "Images");

        Path path = dir.resolve(imageName);

        UrlResource urlResource = null;
        try {
            urlResource = new UrlResource(path.toUri());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        if (urlResource == null) {
            throw new CourseException("No image found!!!");
        }
        return urlResource;
    }

    @Override
    public String updateCourse(MultipartFile video, MultipartFile image, String dto, String cid, String uid) {

        ObjectMapper mapper = new ObjectMapper();
        RequestCourseDTO courseDTO;

        Optional<Course> courseDB = repo.findById(cid);
        if (courseDB.isPresent()) {
            //check wheather the author matches or noy
            if (courseDB.get().getAuthor().equals(uid)) {
                try {
                    courseDTO = mapper.readValue(dto, RequestCourseDTO.class);
                } catch (Exception e) {
                    throw new RuntimeException("Error in converting object  " + e.getMessage());
                }

                //check if video is present or not
                Boolean flag = null;
                if (video != null) {
                    //call Stream-Service
                    try {
                        flag = streamServiceImp.updateVideo(video, courseDTO.stream_id());
                    } catch (RetryableException e) {
                        throw new CourseException("Stream service is down please try later");
                    }
                }
                if (Boolean.FALSE.equals(flag)) {
                    throw new CourseException("Some error while saving the VIDEO!!");
                }

                //for image
                Boolean flag0 = null;
                    if (image != null) {
                        //update Image
                        flag0 = updateImage(image, courseDTO.course_id());
                    }
                    if (Boolean.FALSE.equals(flag0)) {
                        throw new CourseException("Some error while saving the IMAGE!!");
                    }

                //now change the courseINFO
                Course finalCourse = null;
                if(courseDTO!=null){
                Course course = Course.builder()
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
                }
                return "success";
            }else{
                throw new CourseException("Inavaid Input....");
            }
        }else{
            throw new CourseException("No found data.......");
        }
    }



    @Override
    @Transactional
    public Boolean updateImage(MultipartFile image, String cid) {
        Course course = repo.findById(cid)
                .orElseThrow(()->new CourseException("Error while updating Image(Thumbnail)"));
        String imageName = image.getOriginalFilename() + "_" + System.currentTimeMillis(); //crearing new image Name
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
    public String deleteCourse(String cid, String uid) {
        Optional<Course> course = repo.findByAuthor(uid);
        Optional<Course> course_one =repo.findById(cid);

        if(course.isPresent() && course_one.isPresent()){
            //also delete from stream-service.............
            boolean flag;
             try{
                 flag = streamServiceImp.deleteVideo(course.get().getStream_id());
             }catch (RetryableException e){
                 throw new CourseException("stream service is down");
             }
            //and category
            boolean flagOne;
             try{
             flagOne = categoryServiceImp.deleteSubCategory(course.get().getCategory());}
             catch (RetryableException e){
                 throw new CourseException("category service is down");
             }

             if(flag == true && flagOne == true) {
                 //delete image
                 String imageURL = course.get().getThumbnail_url();
                 String[] parts = imageURL.split("/");

                 Path dir = Paths.get(System.getProperty("user.dir"), "Images");
                 Path path = dir.resolve(parts[5]);
                 try{
                     Files.delete(path);
                     repo.deleteById(cid);
                 } catch (Exception e) {
                     System.out.println("Error while deleting course");
                     throw new RuntimeException(e.getMessage());
                 }

                 return "successfully delete the course having the id  :: " + cid;
             }else{
                 throw new CourseException("Error while deleting the course");}
        }else{
            throw new CourseException("No such course is present is present");
        }
    }


    @Override
    public Boolean checkCourse(String courseId) {
      return repo.findById(courseId)
              .map(r->true)
              .orElseThrow(()->new CourseException("no such course is present "));
    }


    @Override
    public ResponseCourseDTO getCourseInfo(String courseId) {
        Course course =  repo.findById(courseId)
                .orElseThrow(()->new CourseException("no such course is present having the id  :: " + courseId));
        TeacherDto dto;
          try{
              dto = restTemplate.getForObject(authServiceURL+"/get-info/"+course.getAuthor(), TeacherDto.class); }
              catch (Exception e){
                throw new CourseException(e.getMessage());
              }
          return ResponseCourseDTO.builder()
                        .course_id(course.getCourse_id())
                        .author(dto.username())
                        .price(course.getPrice())
                        .time(course.getTime())
                        .create_at(course.getCreate_at())
                        .level(course.getLevel())
                        .thumbnail_url(course.getThumbnail_url())
                        .stream_id(course.getStream_id())
                        .description(course.getDescription())
                        .objectives(course.getObjectives())
                        .requirements(course.getRequirements())
                        .authorId(course.getAuthor())
                        .categoryResponseDTO(categoryServiceImp.getSubCategoryInfo(course.getCategory()))
                        .build();
    }


    @Override
    public List<ResponseCourseDTO> getAllCourseByCategory(String category) {

        List<ResponseCourseDTO>  resposneData = repo.findAll()
                .stream()
                .map(m -> new ResponseCourseDTO(m.getCourse_id(),
                        m.getAuthor(),
                        m.getDescription(),
                        m.getLevel(),
                        m.getTime(),
                        m.getThumbnail_url(),
                        m.getCreate_at(),
                        m.getStream_id(),
                        m.getPrice(),
                        m.getObjectives(),
                        m.getRequirements(),
                        m.getAuthor(),
                        categoryServiceImp.getSubCategoryInfo(m.getCategory())
                )).toList();
        return resposneData.stream()
                .filter(f->f.categoryResponseDTO().category().equals(category))
                .collect(Collectors.toList());
    }


    @Override
    public List<ResponseCourseDTO> getAllCourseByLevel(String level) {

        Difficulty difficulty = Difficulty.valueOf(level.toUpperCase());

        return repo.findAll()
                .stream()
                .filter(f->f.getLevel().equals(difficulty))
                .map(m -> new ResponseCourseDTO(
                        m.getCourse_id(),
                        m.getAuthor(),
                        m.getDescription(),
                        m.getLevel(),
                        m.getTime(),
                        m.getThumbnail_url(),
                        m.getCreate_at(),
                        m.getStream_id(),
                        m.getPrice(),
                        m.getObjectives(),
                        m.getRequirements(),
                        m.getAuthor(),
                        categoryServiceImp.getSubCategoryInfo(m.getCategory())
                ))
                .toList();
    }

    @Override
    public List<ResponseCourseDTO> getAllCourseByPriceRange(int range) {

        List<Course> allData = repo.findAll();
        List<Course> filteredCourses;
        if(range < 1000){  //get item below 1000
            filteredCourses = allData.stream()
                    .filter(m -> m.getPrice() < 1000 )
                    .collect(Collectors.toList());
        } else if (range <= 5000) {  //get item between 1000-5000
            filteredCourses = allData.stream()
                    .filter(m -> m.getPrice() >= 1000 && m.getPrice() <= 5000 )
                    .collect(Collectors.toList());
        }else{  //get item above 5000
            filteredCourses = allData.stream()
                    .filter(m -> m.getPrice() > 5000 )
                    .collect(Collectors.toList());
        }
        return filteredCourses.stream()
                .map(m -> new ResponseCourseDTO(
                        m.getCourse_id(),
                        m.getAuthor(),
                        m.getDescription(),
                        m.getLevel(),
                        m.getTime(),
                        m.getThumbnail_url(),
                        m.getCreate_at(),
                        m.getStream_id(),
                        m.getPrice(),
                        m.getObjectives(),
                        m.getRequirements(),
                        m.getAuthor(),
                        categoryServiceImp.getSubCategoryInfo(m.getCategory())
                ))
                .toList();
    }


    @Override
    public List<ResponseCourseDTO> searchByCourse(String name) {
        List<ResponseCourseDTO>  resposneData = repo.findAll()
                .stream()
                .map(m -> new ResponseCourseDTO(m.getCourse_id(),
                        m.getAuthor(),
                        m.getDescription(),
                        m.getLevel(),
                        m.getTime(),
                        m.getThumbnail_url(),
                        m.getCreate_at(),
                        m.getStream_id(),
                        m.getPrice(),
                        m.getObjectives(),
                        m.getRequirements(),
                        m.getAuthor(),
                        categoryServiceImp.getSubCategoryInfo(m.getCategory())
                )).toList();
        return resposneData.stream()
                .filter(f->f.categoryResponseDTO().subcategory()
                        .toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }


}

