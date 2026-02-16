package com.stream.repository;

import com.stream.entity.Stream;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StreamRepo extends JpaRepository<Stream, String> {

    List<Stream> findAllByStreamId(String videoId);

}
