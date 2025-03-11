package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.app.dto.card.Card;
import com.app.service.card.CardService;

@Controller
public class CardController {
	@Autowired
	CardService cardService;
	
	 @GetMapping("/{userId}")
	    public List<Card> getCardsByUserId(@PathVariable String userId) {
	        return cardService.findAllByUserId(userId);
	    }

	    @GetMapping("/detail/{cardId}")
	    public Card getCardById(@PathVariable int cardId) {
	        return cardService.findById(cardId);
	    }

	    @PostMapping
	    public String addCard(@RequestBody Card card) {
	        cardService.saveCard(card);
	        return "카드가 성공적으로 등록되었습니다.";
	    }

	    @PutMapping("/{cardId}")
	    public String updateCard(@PathVariable int cardId, @RequestBody Card card) {
	        card.setCardId(cardId);
	        cardService.updateCard(card);
	        return "카드가 성공적으로 수정되었습니다.";
	    }

	    @DeleteMapping("/{cardId}")
	    public String deleteCard(@PathVariable int cardId) {
	        cardService.deleteCard(cardId);
	        return "카드가 성공적으로 삭제되었습니다.";
	    }

	    @PutMapping("/{userId}/default/{cardId}")
	    public String setDefaultCard(@PathVariable String userId, @PathVariable int cardId) {
	        cardService.updateAllSetDefaultFalse(userId, cardId);
	        return "기본 카드가 변경되었습니다.";
	    }
	}
