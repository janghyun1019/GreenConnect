package com.app.dao.card;

import java.util.List;

import com.app.dto.card.Card;

public interface CardDAO {
    List<Card> findAllByUserId(String userId);
    Card findById(int cardId);
    int saveCard(Card card);
    int updateCard(Card card);
    int deleteCard(int cardId);
    int updateAllSetDefaultFalse(String userId, int excludeCardId);
}
