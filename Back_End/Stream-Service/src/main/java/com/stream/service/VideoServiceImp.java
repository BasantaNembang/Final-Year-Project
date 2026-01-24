package com.stream.service;

import com.stream.dto.VideoDTO;
import com.stream.dto.VideoStreamResponse;
import com.stream.entity.Stream;
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
import java.util.ArrayList;
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

    @Autowired
    private StreamServiceImp streamServiceImp;



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

        String imageName = video.getOriginalFilename()+"_"+System.currentTimeMillis(); //new name

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
    public Boolean deleteVideo(String stream_id) {
        Video video =  videoRepository.findById(stream_id)
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


    @Value("${video.dir}")
    private String video_hsl;



    //call via kafka-service
    @Override
    public void uploadAndProcess(String id, Long secureDIR) {
        try{
            //do hardworking for HSL
            processVideoToHLS(id, secureDIR);
        } catch (Exception e) {
            throw new RuntimeException("video failed "+e.getMessage());
        }
    }



   private void processVideoToHLS(String videoId, Long secureDIR) throws IOException, InterruptedException {

       String inputPath = "/data/input/" + videoId + ".mp4";

       Path videoDir = Paths.get("/data/hls").resolve(videoId);
       Files.createDirectories(videoDir);
       //create  :: data/hls/{videoId}
       Path outputDir = videoDir.resolve(String.valueOf(secureDIR));
       //here String makes like data\hls\{videoId}   which is wrong so ---------->
       Files.createDirectories(outputDir);  //final :: data\hls\{videoId}\{secureDIR}
       // in java \\ == \ so replace that
       String outputDirStr = outputDir.toString().replace("\\", "/");

        List<String> command = new ArrayList<>();
        command.add("docker");
        command.add("exec");
        command.add("ffmpeg-container");
        command.add("ffmpeg");
        command.add("-y");
        command.add("-i");
        command.add(inputPath);

        command.add("-c:v");
        command.add("libx264");
        command.add("-c:a");
        command.add("aac");

        // Split both video and audio
        command.add("-filter_complex");
        command.add("[0:v]split=3[v0][v1][v2];" +
                "[v0]scale=w=640:h=360[v0out];" +
                "[v1]scale=w=1280:h=720[v1out];" +
                "[v2]scale=w=1920:h=1080[v2out];" +
                "[0:a]asplit=3[a0][a1][a2]");

        // Map scaled videos
        command.add("-map");
        command.add("[v0out]");
        command.add("-b:v:0");
        command.add("800k");

        command.add("-map");
        command.add("[v1out]");
        command.add("-b:v:1");
        command.add("2800k");

        command.add("-map");
        command.add("[v2out]");
        command.add("-b:v:2");
        command.add("5000k");

        // Map split audio streams (now separate streams)
        command.add("-map");
        command.add("[a0]");
        command.add("-map");
        command.add("[a1]");
        command.add("-map");
        command.add("[a2]");

        command.add("-var_stream_map");
        command.add("v:0,a:0 v:1,a:1 v:2,a:2");  // Important: different a: indices!

        command.add("-master_pl_name");
        command.add("master.m3u8");

        command.add("-f");
        command.add("hls");
        command.add("-hls_time");
        command.add("10");
        command.add("-hls_list_size");
        command.add("0");
        command.add("-hls_segment_filename");
        command.add(outputDirStr + "/v%v/seg%03d.ts");
        command.add(outputDirStr + "/v%v/index.m3u8");

                System.out.println("Executing command: " + String.join(" ", command));

        Process process = new ProcessBuilder(command)
                .inheritIO()
                .start();

        int exitCode = process.waitFor();

        //DB stuffs
        Stream stream = new Stream();
        stream.setSid(UUID.randomUUID().toString().substring(0,7));
        stream.setSecureDir(secureDIR);
        stream.setStreamId(videoId);
        stream.setIsSave(false);
        if (exitCode != 0) {
            System.out.println("processing fail");
        }else{
            stream.setIsSave(true);
            System.out.println("processing success");
        }
        streamServiceImp.saveToDB(stream);
    }


}
