package com.stream.service;


import com.stream.entity.Stream;
import com.stream.repository.StreamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StreamServiceImp implements StreamService{

    @Autowired
    private StreamRepo streamRepo;

    public void saveToDB(Stream stream) {
        streamRepo.save(stream);
    }


}
