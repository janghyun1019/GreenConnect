package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import com.app.dto.cart.Cart;
import com.app.service.cart.CartService;

@RestController
@RequestMapping("/mypage/Cart")
public class CartController {

	@Autowired
	CartService cartService;

    // 장바구니 조회 (GET)
    @GetMapping("/{userId}")
    public List<Cart> getCartItems(@PathVariable String userId) {
        return cartService.getCartItems(userId);
    }

    // 장바구니 항목 수량 업데이트 (POST)
    @PostMapping("/update")
    public void updateCartItemQuantity(@RequestBody Cart cart) {
        cartService.updateCartItemQuantity(cart.getUserId(), cart.getPostId(), cart.getCount());
    }

    // 장바구니에서 항목 삭제 (POST)
    @PostMapping("/remove")
    public void removeCartItem(@RequestBody Cart cart) {
        cartService.removeCartItem(cart.getUserId(), cart.getPostId());
    }

    // 장바구니 비우기 (POST)
    @PostMapping("/clear")
    public void clearCart(@RequestBody Cart cart) {
        cartService.clearCart(cart.getUserId());
    }
    
}