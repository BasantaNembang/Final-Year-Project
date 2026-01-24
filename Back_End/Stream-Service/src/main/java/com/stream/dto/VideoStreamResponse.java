package com.stream.dto;

import lombok.Builder;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

@Builder
public record VideoStreamResponse(HttpStatus status,
                                  MediaType contentType,
                                  HttpHeaders headers,
                                  long contentLength,
                                  Resource resource) {
}
