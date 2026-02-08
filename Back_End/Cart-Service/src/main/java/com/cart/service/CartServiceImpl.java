package com.cart.service;


import com.cart.Repo.CartRepo;
import com.cart.dto.CartRequest;
import com.cart.entity.Cart;
import com.cart.error.CartException;
import com.cart.external.CartResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepo cartRepo;

    @Value("${course-service.url}")
    private String courseUrl;

    @Autowired
    private RestTemplate restTemplate;


    @Override
    public String saveTheCartData(CartRequest request) {

        //cartRepo.findById(request.)
       Cart cartData = cartRepo.findByUserIdAndCourseId(request.studentId(), request.courseId());

       if(cartData != null) {  throw new CartException("Already added to cart");  }

       CartResponse response;
       try{
           response
                   = restTemplate.getForObject(courseUrl+"/get/cart/"+request.courseId(), CartResponse.class);
       } catch (Exception e) {
           throw new CartException(e.getMessage());
       }

       if(response == null)  throw new CartException("mismatch courseID");

       Cart cart = new Cart();
       cart.setCartId(UUID.randomUUID().toString());
       cart.setDuration(response.duration());
       cart.setPrice(response.price());
       cart.setImageUrl(response.imageUrl());
       cart.setTeacherName(response.teacherName());
       cart.setCourseName(response.courseName());
       cart.setUserId(request.studentId());
       cart.setCourseId(request.courseId());

        cartRepo.save(cart);
        return "success";
    }


    @Override
    public List<CartResponse> getAllCardData(String studentId) {
          return cartRepo.findAllByUserId(studentId)
                .stream()
                .map(m->new CartResponse(m.getCartId(), m.getCourseName(),m.getTeacherName(),
                        m.getImageUrl(), m.getPrice(),m.getDuration(), m.getCourseId()))
                  .toList();
    }


    @Override
    public String deleteCartItem(String cartId) {

        Optional<Cart> cart = cartRepo.findById(cartId);
        if(cart.isEmpty()) throw new CartException("No such cart id");
        cartRepo.deleteById(cartId);
        return "delete completed";
    }


}
