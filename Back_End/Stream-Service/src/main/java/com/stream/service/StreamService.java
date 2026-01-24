package com.stream.service;

import com.stream.entity.Stream;

import java.util.List;

public interface StreamService {

     void saveToDB(Stream stream);

     List<Stream> getALLStreamDATA();

     String getStreamHSLVideoURL(String videoId);
}
