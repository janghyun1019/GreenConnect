package com.app.dao.cart.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.cart.CartDAO;
import com.app.dto.cart.Cart;
@Repository
public class CartDAOImpl implements CartDAO{

	@Autowired
	SqlSessionTemplate sqlSessionTemplate;
	
	@Override
	public List<Cart> getCartItems(String userId) {
		List<Cart> cartList = sqlSessionTemplate.selectList("Cart_mapper.getCartItems",userId);
		return cartList;
	}

	@Override
	public void updateCartItemQuantity(String userId, String postId, int count) {
		Cart cart = new Cart();
		cart.setUserId(userId);
		cart.setPostId(postId);
		cart.setCount(count);
		sqlSessionTemplate.update("Cart_mapper.updateCartItemQuantity",cart);
	}

	@Override
	public void removeCartItem(String userId, String postId) {
		Cart cart = new Cart();
		cart.setUserId(userId);
		cart.setPostId(postId);
		sqlSessionTemplate.delete("Cart_mapper.removeCartItem",cart);
	}

	@Override
	public void clearCart(String userId) {
		sqlSessionTemplate.delete("Cart_mapper.clearCart",userId);
		
	}

}
