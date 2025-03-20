package com.app.dao.gpay;

import com.app.dto.gpay.GpayCharge;
import com.app.dto.gpay.GpayProperty;

public interface GpayDAO {
	
	GpayProperty getGpayInfoByUserId(GpayProperty userId);
	
	int gpayChargeByUserId(GpayCharge gpayCharge);
	
	int addGpayPropertyByUserId(GpayCharge gpayCharge);
	
	GpayProperty findUserIdFromGpayProperty(GpayCharge gpayCharge);
	
	int updateGpayPropertyByUserId(GpayCharge gpayCharge);

}
