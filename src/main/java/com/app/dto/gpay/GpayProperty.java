package com.app.dto.gpay;

import lombok.Data;

@Data
public class GpayProperty {
	
	private String userId; //유저아이디
	private int beforeProperty; //이전잔액
	private int nowProperty; //현재잔액

}
