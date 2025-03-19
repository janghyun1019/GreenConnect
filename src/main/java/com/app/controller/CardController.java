package com.app.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.app.dto.card.Card;
import com.app.service.card.CardService;

@RestController // @Controller 대신 @RestController로 변경 (JSON 응답을 위해)
@RequestMapping("/api/cards") 
public class CardController {
    @Autowired
    CardService cardService;

    @GetMapping // /api/cards
    public List<Card> getCardsByUserId(@RequestParam String userId) { // PathVariable 대신 RequestParam 사용 가능
        return cardService.findAllByUserId(userId);
    }

    @GetMapping("/{cardId}") // /api/cards/{cardId}
    public Card getCardById(@PathVariable int cardId) {
        return cardService.findById(cardId);
    }

    @PostMapping("/register") // /api/cards/register
    public String addCard(@RequestBody Card card) {
        cardService.saveCard(card);
        return "카드가 성공적으로 등록되었습니다.";
    }

    @PutMapping("/{cardId}") // /api/cards/{cardId}
    public String updateCard(@PathVariable int cardId, @RequestBody Card card) {
        card.setCardId(cardId);
        cardService.updateCard(card);
        return "카드가 성공적으로 수정되었습니다.";
    }

    @DeleteMapping("/{cardId}") // /api/cards/{cardId}
    public String deleteCard(@PathVariable int cardId) {
        cardService.deleteCard(cardId);
        return "카드가 성공적으로 삭제되었습니다.";
    }

    @PutMapping("/{cardId}/set-default") // /api/cards/{cardId}/set-default
    public String setDefaultCard(@PathVariable int cardId, @RequestParam String userId) {
        cardService.updateAllSetDefaultFalse(userId, cardId);
        return "기본 카드가 변경되었습니다.";
    }
}