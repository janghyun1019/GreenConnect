package com.app.service.jjim;

import java.util.List;

import com.app.dto.jjim.JjimVO;

public interface JjimService {
	List<JjimVO> getJjimListByUserId(String userId);
	boolean checkJjim(String postId, String userId);
	void removeJjim(String postId, String userId);
}
