package com.category.service;

import com.category.dto.CategoryDTO;
import com.category.dto.CategoryResponseDTO;
import com.category.entity.Category;
import com.category.entity.SubCategory;
import com.category.reposistory.CategoryRepo;
import com.category.reposistory.SubCategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
public class SubCategoryServiceImp implements SubCategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private SubCategoryRepo subCategoryRepo;


    @Override
    @Transactional
    public String saveCategoryInfo(CategoryDTO dto) {
       Category category =  categoryRepo.findByName(dto.category())
               .orElseGet(()-> Category.builder()
                       .name(dto.category())
                       .build());
       SubCategory subCategory = SubCategory.builder()
               .sub_c_id(UUID.randomUUID().toString())
               .name(dto.subcategory())
               .course_id(dto.courseID())
               .build();

       subCategory.setCategory(category);
       category.getSubCategory().add(subCategory);

       categoryRepo.save(category);
       return subCategory.getSub_c_id();
    }


    @Override
    public CategoryResponseDTO getSubCategoryInfo(String subCId) {
        Optional<SubCategory> subCategory = subCategoryRepo.findById(subCId);
        if(subCategory.isEmpty()){
            throw new RuntimeException("No Info Founded !");
        }
        return new CategoryResponseDTO(subCId, subCategory.get().getCategory().getName(),
                subCategory.get().getName(), subCategory.get().getCourse_id());
    }



    @Override
    public Boolean deleteSUBCategory(String cid) {
        Optional<SubCategory> subCategory =  subCategoryRepo.findById(cid);
        if(subCategory.isPresent()){
            subCategoryRepo.deleteById(cid);
            return true;
        }else{
           throw new RuntimeException("failed to delete.......");
        }
    }


}
