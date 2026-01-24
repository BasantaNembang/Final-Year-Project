package com.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
//message of different, different student
public class DmMessages {

    private String mId;  //used to identify the course with respect to student:: courseId + stdId

    private String studentId;

    private String courseName;  //courseName

    private List<DmSubMessages> subMessages;



}
