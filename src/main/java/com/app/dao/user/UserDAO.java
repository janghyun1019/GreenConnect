package com.app.dao.user;

import java.util.List;
import java.util.Map;

import com.app.dto.user.User;

public interface UserDAO {

    // 회원 저장 (가입)
    int saveUser(User user);

    // 전체 회원 목록 조회
    List<User> findUserList();

    // 회원 상세 조회 (아이디)
    User findUserById(String userId);

    // 로그인 체크 (아이디, 비밀번호로 회원 확인)
    User checkUserLogin(User user);

    // 회원 정보 수정
    int modifyUser(User user);

    // 특정 조건(닉네임, 이메일 등)으로 회원 조회
    List<User> findUserListBySearchCondition(Map<String, Object> paramMap);

    // 프로필 이미지 저장
    int saveUserProfileImage(Map<String, Object> paramMap);

    // 프로필 이미지 조회 (아이디)
    String findUserProfileImageById(String userId);

    // 회원 삭제
    int deleteUser(String userId);

    // 비밀번호 변경
    int updateUserPassword(Map<String, Object> paramMap);

    // 중복 사용자 체크
    int isDuplUser(Map<String, Object> paramMap);

}
