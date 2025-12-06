package com.course.external.client;

import com.course.config.FeignClientFileConfig;
import org.springframework.http.MediaType;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "STREAM-SERVICE", configuration= FeignClientFileConfig.class)
public interface StreamService {

    //save Video
    @PostMapping(value = "/video/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String saveVideo(@RequestPart("video") MultipartFile video);

    //update Video
    @PutMapping(value = "/video/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Boolean updateVideo(@RequestPart("video") MultipartFile video
            , @RequestParam("OldVid") String OldVid);

}


