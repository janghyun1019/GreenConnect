package com.app.dto.address;

import lombok.Data;

@Data
public class Address {
	int addrseeId;
	String userId;
	String postalCode;
	String address1;
	String address2;
	String receiver;
	String phone;
	boolean isDefault;
}
