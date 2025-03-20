package com.app.service.gpay;

import com.app.dto.gpay.GpayCharge;
import com.app.dto.gpay.GpayProperty;

public interface GpayService {
	
	GpayProperty getGpayInfoByUserId(GpayProperty userId);
	
	int gpayChargeByUserId(GpayCharge gpayCharge);
	
	int addGpayPropertyByUserId(GpayCharge gpayCharge);
	
	GpayProperty findUserIdFromGpayProperty(GpayCharge gpayCharge);
	
	int updateGpayPropertyByUserId(GpayCharge gpayCharge);

}
