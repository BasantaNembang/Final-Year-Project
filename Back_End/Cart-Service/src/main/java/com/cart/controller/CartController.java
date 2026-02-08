package com.cart.controller;


import com.cart.dto.CartRequest;
import com.cart.external.CartResponse;
import com.cart.service.CartServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartServiceImpl service;

    @PostMapping()
    @PreAuthorize("hasAnyRole('STUDENT')")
    public ResponseEntity<String> saveTheCardData(@RequestBody CartRequest request){
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.saveTheCartData(request));
    }

    @GetMapping("/{studentId}")
    @PreAuthorize("hasAnyRole('STUDENT')")
    public ResponseEntity<List<CartResponse>> getAllCardData(@PathVariable("studentId") String studentId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.getAllCardData(studentId));
    }


    @DeleteMapping("/{cartId}")
    @PreAuthorize("hasAnyRole('STUDENT')")
    public ResponseEntity<String> deleteCartItem(@PathVariable("cartId") String cartId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.deleteCartItem(cartId));
    }




}
