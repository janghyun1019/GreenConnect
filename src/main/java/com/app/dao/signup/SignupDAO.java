package com.app.dao.signup;

import java.util.List;
import com.app.dto.user.User;

public interface SignupDAO {
    
    int insertUser(User user);   // 회원가입
    User getUserById(String userId); // 사용자 아이디로 조회
    User getUserByNickName(String nickName); // 사용자 닉네임으로 조회
    User getUserByJumin(String jumin); // 사용자 주민번호로 조회
    User getUserByTel(String tel); // 사용자 전화번호로 조회
    User getUserByEmail(String email); // 사용자 이메일으로 조회
    User getUserByPassword(String password); // 사용자 비밀번호로 조회
    
    int updateUser(User user);   // 정보 수정
    int deleteUser(String userId);  // 회원 삭제
    
    List<User> getAllUsers();    // 전체 회원 조회
    List<User> NotifyUserList(); // 알림을 받을 사용자 목록 조회
    void resetReport(List<String> userIds); // 신고 초기화
    void updatePassword(String userId, String newPassword); // 비밀번호 변경
    int isDuplicate(String type, String value); // 중복 체크

}
