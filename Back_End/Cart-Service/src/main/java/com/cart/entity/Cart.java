package com.cart.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Cart {

  @Id
  private String cartId;

  private String userId;
  private String imageUrl;
  private String courseName;
  private String teacherName;
  private Double price;
  private int duration;
  private String courseId;


}
