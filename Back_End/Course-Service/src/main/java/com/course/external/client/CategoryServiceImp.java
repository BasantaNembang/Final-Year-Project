package com.course.external.client;

import com.course.external.others.CategoryDTO;
import com.course.external.others.CategoryResponseDTO;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImp{

    private final CategoryService categoryService;

    public CategoryServiceImp(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    public String saveCategory(CategoryDTO dto) {
        return categoryService.saveCategory(dto);
    }

    public boolean deleteSubCategory(String sub_c_id){
        return categoryService.deleteSubCategory(sub_c_id);
    }

    public CategoryResponseDTO getSubCategoryInfo(String sub_c_id){
        return categoryService.getSubCategoryInfo(sub_c_id);
    }







}
