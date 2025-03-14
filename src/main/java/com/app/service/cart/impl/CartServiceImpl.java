package com.app.service.cart.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.cart.CartDAO;
import com.app.dto.cart.Cart;
import com.app.service.cart.CartService;

@Service
public class CartServiceImpl implements CartService{

	
	@Autowired
	CartDAO cartDAO;
	
	@Override
	public List<Cart> getCartItems(String userId) {
		List<Cart> cartList = cartDAO.getCartItems(userId);
		return cartList;
	}

	@Override
	public void updateCartItemQuantity(String userId, String postId, int count) {
		cartDAO.updateCartItemQuantity(userId, postId, count);
	}

	@Override
	public void removeCartItem(String userId, String postId) {
		cartDAO.removeCartItem(userId, postId);
		
	}

	@Override
	public void clearCart(String userId) {
		cartDAO.clearCart(userId);
		
	}

}
