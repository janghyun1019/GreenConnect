package com.app.service.card.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.card.CardDAO;
import com.app.dto.card.Card;
import com.app.service.card.CardService;

@Service
public class CardServiceImpl implements CardService{

	@Autowired
	CardDAO cardDAO;
	
	@Override
	public List<Card> findAllByUserId(String userId) {
		List<Card> cardList = cardDAO.findAllByUserId(userId);
		return cardList;
	}

	@Override
	public Card findById(int cardId) {
		Card card =cardDAO.findById(cardId);
		return card;
	}

	@Override
	public int saveCard(Card card) {
		int result = cardDAO.saveCard(card);
		return result;
	}

	@Override
	public int updateCard(Card card) {
		int result = cardDAO.updateCard(card);
		return result;
	}

	@Override
	public int deleteCard(int cardId) {
		int result = cardDAO.deleteCard(cardId);
		return result;
	}

	@Override
	@Transactional
	public int updateAllSetDefaultFalse(String userId, int excludeCardId) {
        int result = cardDAO.updateAllSetDefaultFalse(userId, excludeCardId);
        Card card = cardDAO.findById(excludeCardId);
        if (card != null) {
            card.setDefault(true);
            return cardDAO.updateCard(card);
        }
        return result;
	}

}
