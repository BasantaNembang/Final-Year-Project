package com.course.external.client;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartFile;

@Configuration
public class StreamServiceImp {

    private final StreamService streamService;

    public StreamServiceImp(StreamService streamService) {
        this.streamService = streamService;
    }

    //save Video
    public String uploadVideo(MultipartFile video) {
       return  streamService.uploadVideo(video);
    }

    //update Video
    public Boolean updateVideo(MultipartFile video, String OldVid) {
        return streamService.updateVideo(video, OldVid);
    }

    //delete video
    public Boolean deleteVideo(String stream_id){
        return streamService.deleteVideo(stream_id);
    }


}
