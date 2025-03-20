package com.app.dao.buy;

import com.app.dto.buy.Buy;

public interface BuyDAO {
	
	int saveBuyInfo(Buy buy);
	
	Buy getBuyInfoByUserIdAndPostId(Buy buy);
	
	int payProduct(Buy buy);
	
	int payProductUseGpay(Buy buy);
	
	int addGpayInfoByUserId(Buy buy);

}
