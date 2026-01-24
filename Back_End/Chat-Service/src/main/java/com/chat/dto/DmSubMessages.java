package com.chat.dto;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
//conversations
public class DmSubMessages {

    private String id;

    private String username;  //the teacher or student name for simple

    private String content;    // the messages
    private Instant time;      // the time


}

