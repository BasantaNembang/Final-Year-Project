package com.category.controller;


import com.category.dto.CategoryDTO;
import com.category.service.SubCategoryServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@CrossOrigin("*")
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private SubCategoryServiceImp categoryService;


    @PostMapping("/save/category")
    public Boolean saveCategory(@RequestBody CategoryDTO dto){
        return categoryService.saveCategoryInfo(dto);
    }

    @GetMapping("/get/{sub_c_id}")
    public ResponseEntity<?> getSubCategoryInfo(@PathVariable("sub_c_id") int sub_c_id){
         return ResponseEntity.status(HttpStatus.OK).body(categoryService.getSubCategoryInfo(sub_c_id));
    }



}
