package com.cart.Repo;


import com.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepo extends JpaRepository<Cart, String> {

    List<Cart> findAllByUserId(String studentId);

    Cart findByUserIdAndCourseId(String userId, String courseId);
}
