package com.course.external.client;

import com.course.config.FeignClientFileConfig;
import org.springframework.http.MediaType;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "STREAM-SERVICE", configuration= FeignClientFileConfig.class)
public interface StreamService {

    //save Video
    @PostMapping(value = "/video/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadVideo(@RequestPart("video") MultipartFile video);

    //update Video
    @PutMapping(value = "/video/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Boolean updateVideo(@RequestPart("video") MultipartFile video
            , @RequestParam("OldVid") String OldVid);


    //delete video
    @DeleteMapping("/video/delete/{stream_id}")
    public Boolean deleteVideo(@PathVariable("stream_id") String stream_id);


}


