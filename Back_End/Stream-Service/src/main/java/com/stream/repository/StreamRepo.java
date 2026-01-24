package com.stream.repository;

import com.stream.entity.Stream;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StreamRepo extends JpaRepository<Stream, String> {
    Optional<Stream> findByStreamId(String videoId);
}
