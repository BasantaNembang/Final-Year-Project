package com.stream.kafka;


import com.course.event.StreamDTO;
import com.stream.service.VideoServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.CompletableFuture;

@Service
public class VideoService {

    @Autowired
    private VideoServiceImp videoServiceImp;

    @KafkaListener(topics = "ProcessVideoHSL")
    public void uploadAndProcessVideo(StreamDTO streamDTO) {
        System.out.println("Received: " + streamDTO.getMessage());

        if (streamDTO.getStreamId() == null) {
            return;
        }

        // Process in a separate thread to avoid blocking Kafka
        CompletableFuture.runAsync(() -> {
            try {
                long secureDIR = System.currentTimeMillis();
                videoServiceImp.uploadAndProcess(streamDTO.getStreamId().toString(), secureDIR);

                // Delete the original mp4
                Path path = Paths.get(streamDTO.getFilePath().toString());
                Files.deleteIfExists(path);

                System.out.println("Processing complete for video: " + streamDTO.getStreamId());
            } catch (Exception e) {
                // Log error for manual retry
                System.err.println("Processing failed for video: " + streamDTO.getStreamId() + " -> " + e.getMessage());
            }
        });
    }

}
//ffmpeg takes long time......10 + mins here kafka may think it fail, and reconsume the message making two different folder with its video version,
//so to deal with it running it in separate thread