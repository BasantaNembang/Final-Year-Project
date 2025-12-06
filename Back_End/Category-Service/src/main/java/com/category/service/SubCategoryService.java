package com.category.service;

import com.category.dto.CategoryDTO;
import com.category.dto.ResponseDTO;

public interface SubCategoryService {
    boolean saveCategoryInfo(CategoryDTO dto);

    ResponseDTO getSubCategoryInfo(int subCId);
}
