package com.stream.controller;


import com.stream.dto.VideoDTO;
import com.stream.dto.VideoStreamResponse;
import com.stream.entity.Stream;
import com.stream.service.StreamServiceImp;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.stream.service.VideoServiceImp;

import java.util.List;


@RestController
@RequestMapping("/video")
public class VideoController {

    @Autowired
    private VideoServiceImp videoServiceImp;

    @Autowired
    private StreamServiceImp streamService;

    //video-URL
    @PostMapping("/save")
    @PreAuthorize("hasAnyRole('TEACHER')")
    public String saveVideo(@RequestPart("video") MultipartFile video){
        return videoServiceImp.saveVideo(video);
    }

    @GetMapping("/get-all")  //get all video
    public ResponseEntity<List<VideoDTO>> getAllVideos(){
        return ResponseEntity.status(HttpStatus.OK).body(videoServiceImp.getAllVideos());
    }

    @GetMapping("/stream/{vid}")  //stream video
    public ResponseEntity<Resource> steamVideo(@PathVariable("vid") String vid,
                                                @RequestHeader(value = "Range", required = false) String Range){
        VideoStreamResponse response = videoServiceImp.steamVideo(vid, Range);
        return ResponseEntity.status(response.status())
                .contentType(response.contentType())
                .contentLength(response.contentLength())
                .body(response.resource());
    }

    @PutMapping("/update")
    @PreAuthorize("hasAnyRole('TEACHER')")
    public Boolean updateVideo(@RequestPart("video") MultipartFile video
            , @RequestParam("OldVid") String OldVid){
        return videoServiceImp.updateVideo(video, OldVid);
    }

   @DeleteMapping("/delete/{stream_id}")
   @PreAuthorize("hasAnyRole('TEACHER')")
   public Boolean deleteVideo(@PathVariable("stream_id") String stream_id){
        return videoServiceImp.deleteVideo(stream_id);
   }


   //stream-URL
   @GetMapping("/stream-hsl/{streamId}")
   @PreAuthorize("hasAnyRole('STUDENT')")
   public ResponseEntity<String> getStreamHSLVideoURL(@PathVariable("streamId") String streamId) {
       return ResponseEntity.status(HttpStatus.OK).body(streamService.getStreamHSLVideoURL(streamId));
   }


    @GetMapping("/stream/get-all")
    @PreAuthorize("hasAnyRole('STUDENT')")
    public List<Stream> getALlStreamDATA() {
       return streamService.getALLStreamDATA();
    }



}
