package com.category.reposistory;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SubCategoryRepo extends JpaRepository<com.category.entity.SubCategory, String> {
}
