package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.app.dto.buy.Buy;
import com.app.service.buy.BuyService;

@Controller
public class BuyController {
	
	@Autowired
	BuyService buyService;
	
	@PostMapping("/api/buyProduct")
    public ResponseEntity<?> buyProduct(@RequestBody Buy buy) {
		
		System.out.println("구매하려는 정보: " + buy);
		
        int result = buyService.saveBuyInfo(buy);

        if (result > 0) {
            return ResponseEntity.ok("성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("실패");
        }
    }
	
	@PostMapping("/api/getBuyInfo")
	public ResponseEntity<?> getBuyInfoByUserIdAndPostId(@RequestBody Buy buy) { //구매유저아이디, 포스트아이디 들어있음
		Buy buyInfo = buyService.getBuyInfoByUserIdAndPostId(buy);
		
		System.out.println("buyInfo 요청들어옴");
		System.out.println(buyInfo);
		
		if (buyInfo != null) {
	        return ResponseEntity.ok(buyInfo);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No buy info found for the given userId and postId");
	    }
	}
	
	@PostMapping("/api/payProduct")
	public ResponseEntity<?> payProduct(@RequestBody Buy buy) {
		System.out.println("결제하려는 정보: " + buy);
		
		System.out.println("결제 타입: " + buy.getPaymentType());
		
		if(buy.getPaymentType().equals("gPay")) {
			int result1 = buyService.payProduct(buy); // 기본 pay
			int result2 = buyService.payProductUseGpay(buy); // gpayProperty 현재금액-결제금액 용도
			System.out.println("gpay로 결제");
			if (result1 > 0 && result2 > 0) {
	            return ResponseEntity.ok("성공");
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("실패");
	        }
			
		} else {
			int result = buyService.payProduct(buy); // 기본 pay
			System.out.println("일반 결제");
			if (result > 0) {
	            return ResponseEntity.ok("성공");
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("실패");
	        }
		}
		
	}
	
	
	

}