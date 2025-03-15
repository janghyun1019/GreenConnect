package com.app.dto.trade;

import lombok.Data;

@Data
public class Trade {
    int tradeId;         
    int buyId;           
    String userId;       
    double totalPrice;   
    String paymentMethod;
    String paymentStatus;
    String deliveryStatus;
    String createdAt;
}