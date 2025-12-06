package com.auth.entity;


import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Teacher extends Account{

    private String username;
    private String job;
    private String phoneNumber;
    private String address;
    private String background;
    private String imageUrl;


}
