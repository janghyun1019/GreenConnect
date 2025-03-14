package com.app.service.cart;

import java.util.List;

import com.app.dto.cart.Cart;

public interface CartService {

	List<Cart> getCartItems(String userId);
	void updateCartItemQuantity(String userId, String postId, int count);
	void removeCartItem(String userId, String postId);
	void clearCart(String userId);
}
