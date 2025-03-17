package com.app.service.buy;

import com.app.dto.buy.Buy;

public interface BuyService {
	
	int saveBuyInfo(Buy buy);
	
	Buy getBuyInfoByUserIdAndPostId(Buy buy);
	
	int payProduct(Buy buy);

}
