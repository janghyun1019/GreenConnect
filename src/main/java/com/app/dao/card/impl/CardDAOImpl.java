package com.app.dao.card.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.card.CardDAO;
import com.app.dto.card.Card;

@Repository
public class CardDAOImpl implements CardDAO{

	@Autowired
	SqlSessionTemplate sqlSessionTemplate;
	
	@Override
	public List<Card> findAllByUserId(String userId) {
		List<Card> cardList = sqlSessionTemplate.selectList("Card_mapper.findAllByUserId");
		return cardList;
	}

	@Override
	public Card findById(int cardId) {
		Card card = sqlSessionTemplate.selectOne("Card_mapper.findById");
		return card;
	}

	@Override
	public int saveCard(Card card) {
		int result = sqlSessionTemplate.insert("Card_mapper.saveCard",card);
		return result;
	}

	@Override
	public int updateCard(Card card) {
		int result = sqlSessionTemplate.update("Card_mapper.updateCard",card);
		return result;
	}

	@Override
	public int deleteCard(int cardId) {
		int result = sqlSessionTemplate.delete("Card_mapper.deleteCard",cardId);
		return result;
	}

	@Override
	public int updateAllSetDefaultFalse(String userId, int excludeCardId) {
		Map<String, Object> params = new HashMap<>();
		params.put("userId", userId);
		params.put("excludeCardId", excludeCardId);	
		return sqlSessionTemplate.update("Card_mapper.updateAllSetDefaultFalse",params);
	}

}
