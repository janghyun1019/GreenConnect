package com.app.dao.signup;

import com.app.dto.user.SnsUser;

public interface SnsUserDAO {

	int insertSnsUser(SnsUser snsUser);
    SnsUser findBySnsId(String snsId);
}
