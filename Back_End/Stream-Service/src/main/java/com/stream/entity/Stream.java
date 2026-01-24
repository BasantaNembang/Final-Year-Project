package com.stream.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Stream {

    @Id
    private String sid;

    @Column(name = "secure_dir")
    private Long secureDir;

    @Column(name = "is_save")
    private Boolean isSave;

    @Column(name = "stream_id")
    private String streamId;




}
