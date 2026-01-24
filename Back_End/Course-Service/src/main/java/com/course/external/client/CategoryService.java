package com.course.external.client;


import com.course.config.AuthFeignConfig;
import com.course.external.others.CategoryDTO;
import com.course.external.others.CategoryResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "CATEGORY-SERVICE", configuration = AuthFeignConfig.class)
public interface CategoryService {

    @PostMapping("/category/save/category")
    public String saveCategory(@RequestBody CategoryDTO dto);

    @DeleteMapping("/category/delete/{sub_c_id}")
    public Boolean deleteSubCategory(@PathVariable("sub_c_id") String sub_c_id);

    @GetMapping("/category/get/{sub_c_id}")
    public CategoryResponseDTO getSubCategoryInfo(@PathVariable("sub_c_id") String sub_c_id);


}
