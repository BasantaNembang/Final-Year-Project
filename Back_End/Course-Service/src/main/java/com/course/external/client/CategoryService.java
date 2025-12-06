package com.course.external.client;


import com.course.external.others.CategoryDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "CATEGORY-SERVICE")
public interface CategoryService {

    @PostMapping("/category/save/category")
    public Boolean saveCategory(@RequestBody CategoryDTO dto);


}
