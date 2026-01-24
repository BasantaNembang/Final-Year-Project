package com.stream.service;


import com.stream.dto.VideoDTO;
import com.stream.dto.VideoStreamResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VideoService {

    String saveVideo(MultipartFile file);

    List<VideoDTO> getAllVideos();

    VideoStreamResponse steamVideo(String vid, String Range);

    Boolean updateVideo(MultipartFile video, String vid);

    Boolean deleteVideo(String videoId);

    void uploadAndProcess(String videoId, Long secureDIR);
}
