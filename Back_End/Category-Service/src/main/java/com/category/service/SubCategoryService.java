package com.category.service;

import com.category.dto.CategoryDTO;
import com.category.dto.CategoryResponseDTO;

public interface SubCategoryService {

    String saveCategoryInfo(CategoryDTO dto);

    CategoryResponseDTO getSubCategoryInfo(String subCId);

    Boolean deleteSUBCategory(String cid);
}
