package com.app.dao.signup;

import java.util.List;

import com.app.dto.user.User;


public interface UserDAO {

	int insertUser(User user);   // 회원가입
    User getUserById(String userId); // 사용자 아이디로 조회
    User getUserByNickName(String nickName); // 사용자 닉네임으로 조회
    User getUserByJumin(String jumin); // 사용자 주민번호으로 조회
    User getUserByTel(String tel); // 사용자 전화번호으로 조회
    User getUserByEmail(String email); // 사용자 이메일으로 조회
    User getUserByPassword(String password); // 사용자 이메일으로 조회
    int updateUser(User user);   // 정보 수정
    int deleteUser(String userId);  // 회원 삭제
    List<User> getAllUsers();    // 전체 회원 조회
    List<User> NotifyUserList();
    void resetReport(List<String> userIds);
    void updatePassword(String userId, String newPassword);
	
}
