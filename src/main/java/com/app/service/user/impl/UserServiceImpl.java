package com.app.service.user.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.user.UserDAO;
import com.app.dto.user.CustomUserDetails;
import com.app.dto.user.User;
import com.app.service.user.UserService;

@Service
public abstract class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDAO;

    @Override
    public int saveUser(User user) {
        return userDAO.saveUser(user);
    }

    @Override
    public int saveCustomerUser(User user) {
        user.setUserType("CUS");
        return userDAO.saveUser(user);
    }

    @Override
    public int saveAdminUser(User user) {
        user.setUserType("ADM");
        return userDAO.saveUser(user);
    }

    @Override
    public List<User> findUserList() {
        return userDAO.findUserList();
    }

    @Override
    public User checkUserLogin(User user) {
        return userDAO.checkUserLogin(user);
    }

    @Override
    public User findUserById(String userId) {
        return userDAO.findUserById(userId);
    }

    @Override
    public int modifyUser(User user) {
        return userDAO.modifyUser(user);
    }

    @Override
    public List<User> findUserListBySearchCondition(Map<String, Object> paramMap) {
        return userDAO.findUserListBySearchCondition(paramMap);
    }

    @Override
    public boolean isDuplicatedId(String id) {
        User user = userDAO.findUserById(id);
        return user != null;
    }

    @Override
    public int saveUserProfileImage(Map<String, Object> paramMap) {
        return userDAO.saveUserProfileImage(paramMap);
    }

    @Override
    public String findUserProfileImageById(String userId) {
        return userDAO.findUserProfileImageById(userId);
    }

    @Override
    public int deleteUser(String userId) {
        return userDAO.deleteUser(userId);
    }

    @Override
    public int updateUserPassword(Map<String, Object> paramMap) {
        return userDAO.updateUserPassword(paramMap);
    }

    @Override
    public int isDuplUser(Map<String, Object> paramMap) {
        return userDAO.isDuplUser(paramMap);
    }

	@Override
	public void insertUser(User user) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public User getUserById(String userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CustomUserDetails convertToUserDetails(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateUser(User user) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public User getUserByEmail(String email) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isDuplicateUser(String type, String value) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void updatePassword(String userId, String password) {
		// TODO Auto-generated method stub
		
	}

}
