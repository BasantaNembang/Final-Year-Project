package com.chat.dto;

import java.time.Instant;
import java.util.List;

public record SubMessageLikeDTO(String sMId, String sender, String content, Instant time,
                                List<String> userId) {
}

