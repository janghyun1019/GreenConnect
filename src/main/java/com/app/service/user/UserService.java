package com.app.service.user;

import java.util.List;
import java.util.Map;

import com.app.dto.user.CustomUserDetails;
import com.app.dto.user.User;

public interface UserService {

    // 유저 회원가입
    int saveUser(User user);
    int saveCustomerUser(User user);
    int saveAdminUser(User user);

    // 전체 회원목록 조회
    List<User> findUserList();

    // 로그인 체크
    User checkUserLogin(User user);

    // 유저 아이디로 상세 조회
    User findUserById(String userId);

    // 유저 정보 변경
    int modifyUser(User user);

    // 조건에 따라 유저 목록 조회
    List<User> findUserListBySearchCondition(Map<String, Object> paramMap);

    // 아이디 중복 여부 체크
    boolean isDuplicatedId(String id);

    // 프로필 이미지 저장
    int saveUserProfileImage(Map<String, Object> paramMap);

    // 프로필 이미지 조회
    String findUserProfileImageById(String userId);

    // 유저 삭제
    int deleteUser(String userId);

    // 비밀번호 업데이트
    int updateUserPassword(Map<String, Object> paramMap);

    // 유저 중복 여부 검사 (닉네임, 이메일, 전화번호 등 범용으로 사용)
    int isDuplUser(Map<String, Object> paramMap);
    
	void insertUser(User user);
	
	User getUserById(String userId);
	
	CustomUserDetails convertToUserDetails(User user);
	
	void updateUser(User user);
	
	User getUserByEmail(String email);
	
	boolean isDuplicateUser(String type, String value);
	
	void updatePassword(String userId, String password);
	int registerUser(User user);
	User getUser(String userId);
	User getUserForEmail(String email);
	boolean isDuplicatedNick(String userNick);
	boolean isDuplicatedTel(String userTel);
	boolean isDuplicatedEmail(String userEmail);
}
