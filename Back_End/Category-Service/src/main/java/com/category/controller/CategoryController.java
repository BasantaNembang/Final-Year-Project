package com.category.controller;


import com.category.dto.CategoryDTO;
import com.category.dto.CategoryResponseDTO;
import com.category.service.SubCategoryServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/category")
public class CategoryController {


    @Autowired
    private SubCategoryServiceImp categoryService;


    @PostMapping("/save/category")
    @PreAuthorize("hasAnyRole('TEACHER')") //return the sub_category pk_id
    public String saveCategory(@RequestBody CategoryDTO dto){
        return categoryService.saveCategoryInfo(dto);
    }

    @GetMapping("/get/{sub_c_id}")
    public CategoryResponseDTO getSubCategoryInfo(@PathVariable("sub_c_id") String sub_c_id){
         return categoryService.getSubCategoryInfo(sub_c_id);
    }


    @DeleteMapping("/delete/{sub_c_id}")
    @PreAuthorize("hasAnyRole('TEACHER')")
    public Boolean deleteSubCategory(@PathVariable("sub_c_id") String sub_c_id){
        return categoryService.deleteSUBCategory(sub_c_id);
    }




}
