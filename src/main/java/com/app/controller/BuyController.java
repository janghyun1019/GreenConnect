package com.app.controller;

import java.util.List;

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
		
		int gpayResult = buyService.addGpayInfoByUserId(buy);
		System.out.println("지페이생성: " + gpayResult);
        int result = buyService.saveBuyInfo(buy);

        if (result > 0) {
            return ResponseEntity.ok("성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("실패");
        }
    }
	
	@PostMapping("/api/removeBuyInfo")
	public ResponseEntity<?> removeBuyInfoByUserIdAndPostId(@RequestBody Buy buy){
		System.out.println("지우려는 구매 정보: " + buy);
		int result = buyService.removeBuyInfoByUserIdAndPostId(buy);
		
		if (result > 0) {
            return ResponseEntity.ok("성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("실패");
        }
	}
	
	@PostMapping("/api/removeAllBuyInfo")
	public ResponseEntity<?> removeAllBuyInfoByUserId(@RequestBody Buy buy){
		System.out.println("전체 지우려는 구매 유저정보: " + buy);
		int result = buyService.removeAllBuyInfoByUserId(buy);
		
		if (result > 0) {
            return ResponseEntity.ok("성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("실패");
        }
	}
	
	@PostMapping("/api/getBuyInfo")
	public ResponseEntity<?> getBuyInfoByUserIdAndPostId(@RequestBody Buy buy) { //구매유저아이디, 포스트아이디 들어있음
		System.out.println("후기 구매자 정보: " + buy);
		
		Buy buyInfo;
		List<Buy> buyInfoList;
		
		if(buy.getPostId()!=null) {
			buyInfo = buyService.getBuyInfoByUserIdAndPostId(buy);
		}else {
			buyInfoList = buyService.getBuyInfoByUserId(buy);
			
			System.out.println("buyInfoList 요청들어옴");
			System.out.println(buyInfoList);
			
			if (buyInfoList != null) {
		        return ResponseEntity.ok(buyInfoList);
		    } else {
		        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No buy info found for the given userId and postId");
		    }
			
		}
		
		
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