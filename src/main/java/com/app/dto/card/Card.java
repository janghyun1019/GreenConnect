package com.app.dto.card;

import lombok.Data;

@Data
public class Card {
	int cardId;
	String userId;
	String cardType;
	String cardProvider;
	String lastFour;
	String expires;
	boolean isDefault;
}
