package com.category.service;

import com.category.dto.CategoryDTO;
import com.category.dto.ResponseDTO;
import com.category.entity.Category;
import com.category.entity.SubCategory;
import com.category.reposistory.CategoryRepo;
import com.category.reposistory.SubCategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class SubCategoryServiceImp implements SubCategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private SubCategoryRepo subCategoryRepo;


    @Override
    @Transactional
    public boolean saveCategoryInfo(CategoryDTO dto) {
       Category category =  categoryRepo.findByName(dto.category())
               .orElseGet(()-> Category.builder()
                       .name(dto.category())
                       .build());
       SubCategory subCategory = SubCategory.builder()
               .name(dto.subcategory())
               .course_id(dto.courseID())
               .build();

       subCategory.setCategory(category);
       category.getSubCategory().add(subCategory);

       categoryRepo.save(category);
       return true;
    }


    @Override
    public ResponseDTO getSubCategoryInfo(int subCId) {
        Optional<SubCategory> subCategory = subCategoryRepo.findById(subCId);
        if(subCategory.isEmpty()){
            throw new RuntimeException("No Info Founded !");
        }
        ResponseDTO response =  new ResponseDTO(subCId, subCategory.get().getCategory(),
                subCategory.get().getName(), "OIO-OOP");
        return response;
    }


}
