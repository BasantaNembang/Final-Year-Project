package com.category.dto;

import com.category.entity.Category;

public record ResponseDTO(int sub_c_id, Category category,
                          String subcategory, String course_id) {
}
