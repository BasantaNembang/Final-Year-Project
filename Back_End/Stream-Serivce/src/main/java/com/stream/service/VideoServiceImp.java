package com.stream.service;

import com.stream.dto.VideoDTO;
import com.stream.dto.VideoStreamResponse;
import com.stream.entity.Video;
import com.stream.error.StreamException;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.stream.repository.VideoRepository;

import java.io.*;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class VideoServiceImp implements VideoService{

    @Value("${file.video}")
    private String DIR;

    @Autowired
    private VideoRepository videoRepository;

    @PostConstruct()
    void init(){
        File file = new File(DIR);
        if(!file.exists()){
            file.mkdir();
        }
    }


    @Override
    public String saveVideo(MultipartFile video) {

        String imageName = video.getOriginalFilename()+"_"+System.currentTimeMillis();
        Path path = Paths.get(DIR, imageName);
        try{
            Files.copy(video.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        Video v = new Video();
        v.setVid(UUID.randomUUID().toString().substring(0,6));
        v.setVideo_type(video.getContentType());
        v.setVideo_path(path.toString());
        v.setVideo_name(imageName);
        Video video1 = videoRepository.save(v);
        return video1.getVid();
    }



    @Override
    public List<VideoDTO> getAllVideos() {
         return videoRepository.findAll().stream()
                .map(video->new VideoDTO(video.getVid(), video.getVideo_name(), video.getVideo_type(), video.getVideo_path() ))
                .collect(Collectors.toList());
    }


    @Override
    public VideoStreamResponse steamVideo(String vid, String Range){
        Video video = videoRepository.findById(vid)
                .orElseThrow(()->new StreamException("Video not found of the id  "+vid));

        Resource resource = new FileSystemResource(video.getVideo_path());
        MediaType type = MediaType.parseMediaType(video.getVideo_type());
        Path path =  Paths.get(video.getVideo_path());

        String[] ranges =  Range.replace("bytes=", "").split("-");

         Long startRange = Long.parseLong(ranges[0]);
         Long lastRange;
         Long fileLength =path.toFile().length();

        if(ranges.length>1){
           lastRange  = Long.parseLong(ranges[1]);
         }else{
            lastRange = fileLength-1;
        }
         if(lastRange > fileLength -1){
             lastRange = fileLength -1;
         }


         Long contentLength = lastRange-startRange+1;
         Long fileSize;
         try{
         fileSize =  resource.contentLength();
         } catch (IOException e) {
             throw new RuntimeException(e);
         }
         HttpHeaders httpHeaders = new HttpHeaders();
         httpHeaders.add(HttpHeaders.CONTENT_RANGE, "bytes " + startRange + "-" + lastRange + "/" + fileSize);
         httpHeaders.add("Access-Control-Allow-Origin", "*");
         httpHeaders.add("Expires", "0");
         httpHeaders.add("Cache-Control", "no-cache, no-store, must-revalidate");
         httpHeaders.add("Pragma", "no-cache");
         httpHeaders.add("X-Content-Type-Options", "nosniff");
         httpHeaders.add("Access-Control-Allow-Headers", "Range");
         httpHeaders.add("Accept-Ranges", "bytes");

         httpHeaders.setContentLength(contentLength);

        InputStream inputStream;
        try{
         inputStream= new FileInputStream(resource.getFile());
         inputStream.skip(startRange);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return VideoStreamResponse.builder()
                .resource(new InputStreamResource(inputStream))
                .contentLength(contentLength)
                .headers(httpHeaders)
                .contentType(type)
                .status(HttpStatus.PARTIAL_CONTENT)
                .build();
    }

    @Override
    public Boolean updateVideo(MultipartFile video, String OldVid) {

        String imageName = video.getOriginalFilename()+"_"+System.currentTimeMillis();

        Video v =  videoRepository.findById(OldVid)
                .orElseThrow(()->new StreamException("No such video FOUND!!"));

        //delete OLD-ONE
        Path dir = Paths.get(System.getProperty("user.dir"), DIR);
        try{
            Path path = dir.resolve(v.getVideo_name());
            Files.delete(path);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        //add new One
        Path path = dir.resolve(imageName);
        try{
            Files.copy(video.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        v.setVideo_type(video.getContentType());
        v.setVideo_path(path.toString());
        v.setVideo_name(imageName);
        videoRepository.save(v);
        return true;
    }

   @Override
    public Boolean deleteVideo(String videoId) {
        Video video =  videoRepository.findById(videoId)
                .orElseThrow(()->new StreamException("No such video FOUND!!"));

        Path dir = Paths.get(System.getProperty("user.dir"), DIR);
        Path path = dir.resolve(video.getVideo_name());
        try{
            Files.delete(path);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        videoRepository.delete(video);
        return true;
    }


}
