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
		
		if (buyInfo != null) {
	        return ResponseEntity.ok(buyInfo);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No buy info found for the given userId and postId");
	    }
	}

}
