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
//meaning discussion of many people on that course

public class Message {


    private String mId;
    private String sender;
    private String content;
    private Instant time;

    //sub comment ->Reply
    List<SubMessage> subMessages = new ArrayList<>();

}
