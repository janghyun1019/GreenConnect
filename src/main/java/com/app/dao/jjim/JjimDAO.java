package com.app.dao.jjim;

import java.util.List;

import com.app.dto.jjim.JjimVO;

public interface JjimDAO {
	List<JjimVO> getJjimListByUserId(String userId);
	boolean checkJjim(String postId, String userId);
	void removeJjim(String postId, String userId);
}
