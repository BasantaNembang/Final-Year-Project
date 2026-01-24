package com.course.model;


import com.course.dto.Difficulty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Course {


    @Id
    private String course_id;

    private String author;   //should be the person having role : MENTOR
    //private String title;  //name in sub category-service :: i think, i can remove this
    private String description;

    private Difficulty level;
    private int time;
    private String thumbnail_url;
    private Instant create_at;
    private String stream_id;  //content-service -> get the video content
    private Double price;

    private List<String> objectives;
    private List<String> requirements;

    private String category; //id of sub_category -> get category , title and so on............



}

