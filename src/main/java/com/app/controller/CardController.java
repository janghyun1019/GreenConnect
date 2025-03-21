package com.app.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.app.dto.card.Card;
import com.app.service.card.CardService;

@RestController
@RequestMapping("/api/cards")
public class CardController {
    @Autowired
    CardService cardService;

    @GetMapping
    public List<Card> getCardsByUserId(@RequestParam(required = false) String userId) {
        System.out.println("Received userId: " + userId); // 요청된 userId
        if (userId == null || userId.isEmpty()) {
            throw new IllegalArgumentException("userId는 필수입니다.");
        }
        List<Card> cards = cardService.findAllByUserId(userId);
        System.out.println("Returning cards: " + cards); // 반환 데이터
        return cards;
    }

    @GetMapping("/{cardId}")
    public Card getCardById(@PathVariable int cardId) {
        return cardService.findById(cardId);
    }

    @PostMapping("/register")
    public String addCard(@RequestBody Card card) {
        // userId는 요청 본문에서 가져옴
        if (card.getUserId() == null || card.getUserId().isEmpty()) {
            return "userId가 필요합니다.";
        }
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

    @PutMapping("/{cardId}/set-default")
    public String setDefaultCard(@PathVariable int cardId, @RequestParam String userId) {
        cardService.updateAllSetDefaultFalse(userId, cardId);
        return "기본 카드가 변경되었습니다.";
    }
}