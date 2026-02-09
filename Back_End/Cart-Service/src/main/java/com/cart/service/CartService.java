package com.cart.service;

import com.cart.dto.CartRequest;
import com.cart.external.CartResponse;

import java.util.List;

public interface CartService {

    String saveTheCartData(CartRequest request);

    List<CartResponse> getAllCardData(String studentId);

    String deleteCartItem(String cartId);
}
