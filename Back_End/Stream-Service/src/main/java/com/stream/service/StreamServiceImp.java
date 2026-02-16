package com.stream.service;


import com.stream.entity.Stream;
import com.stream.error.StreamException;
import com.stream.repository.StreamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StreamServiceImp implements StreamService{

    @Autowired
    private StreamRepo streamRepo;

    public void saveToDB(Stream stream) {
        streamRepo.save(stream);
    }


    @Override
    public List<Stream> getALLStreamDATA() {
        return streamRepo.findAll();
    }


    @Override
    public String getStreamHSLVideoURL(String streamId) {
        List<Stream> stream = streamRepo.findAllByStreamId(streamId);

        for(Stream s: stream){
          if(s.getIsSave().equals(true)){
            return "http://localhost:9292/hls/" + streamId+ "/" + s.getSecureDir() + "/master.m3u8";
         }
        }
        throw new StreamException("video is not available at the movement");
    }


}
