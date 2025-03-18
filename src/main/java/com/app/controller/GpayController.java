package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.app.dto.gpay.GpayCharge;
import com.app.dto.gpay.GpayProperty;
import com.app.service.gpay.GpayService;

@Controller
public class GpayController {
	
	@Autowired
	GpayService gpayService;
	
	@PostMapping("/api/getGpayInfo")
	public ResponseEntity<?> getGpayInfoByUserId(@RequestBody GpayProperty userId) {
		System.out.println("gpay현재잔액정보 불러오려는 유저ID: " + userId);
		
		GpayProperty gpayProperty = gpayService.getGpayInfoByUserId(userId);
		
		if (gpayProperty != null) {
	        return ResponseEntity.ok(gpayProperty);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No gpayProperty info found for the given userId");
	    }
	}
	
	@PostMapping("/api/gpayCharge")
	public ResponseEntity<String> gpayChargeByUserId(@RequestBody GpayCharge gpayCharge) {
		System.out.println("gpay충전 하려는 정보: " + gpayCharge);
		
        int result = gpayService.gpayChargeByUserId(gpayCharge);
        
        GpayProperty gpayPropertyUserId = gpayService.findUserIdFromGpayProperty(gpayCharge);
        
        if(gpayPropertyUserId != null) {
        	int updateGpayProperty = gpayService.updateGpayPropertyByUserId(gpayCharge);
        	if(updateGpayProperty > 0) {
        		System.out.println("기존 유저 gpay충전 업데이트 완료");
        	}
        }else {
        	int addGpayProperty = gpayService.addGpayPropertyByUserId(gpayCharge);
        	if(addGpayProperty > 0) {
        		System.out.println("유저 gpay 첫 충전 완료");
        	}
        }
        

        if (result > 0) {
            return ResponseEntity.ok("성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("실패");
        }
	}

}
