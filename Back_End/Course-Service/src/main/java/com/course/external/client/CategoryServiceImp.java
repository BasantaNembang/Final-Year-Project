package com.course.external.client;

import com.course.external.others.CategoryDTO;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImp{

    private final CategoryService categoryService;

    public CategoryServiceImp(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    public Boolean saveCategory(CategoryDTO dto) {
        return categoryService.saveCategory(dto);
    }


}
