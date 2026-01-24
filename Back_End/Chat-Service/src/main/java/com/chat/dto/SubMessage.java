package com.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
//meaning reply of the Message
public class SubMessage {

    private String sMId;
    private String sender;
    private String content;
    private Instant time;

    //use for LIKE
    private List<String> userId = new ArrayList<>();

}
