package com.app.dto.user;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomUserDetails<GrantedAuthority> implements UserDetails {

    private static final long serialVersionUID = 1L;

    private String userId;
    private String password;
    private String userName;
    private String nickName;
    private String profileImage;
    private String email;
    private String tel;
    private String role;
    private String status;
    private String userType;

    public Collection<? extends org.springframework.security.core.GrantedAuthority> getAuthorities() {
        // 권한 정보가 있다면 권한 리스트를 만들어 반환
        return Collections.emptyList();
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return userId;
    }

    public boolean isAccountNonExpired() {
        return "active".equalsIgnoreCase(status);
    }

    public boolean isAccountNonLocked() {
        return "active".equalsIgnoreCase(status);
    }

    public boolean isCredentialsNonExpired() {
        return true;
    }

    public boolean isEnabled() {
        return "active".equalsIgnoreCase(status);
    }

	public void setUserId(Object userId2) {
		// TODO Auto-generated method stub
		
	}

	public void setPassword(String password2) {
		// TODO Auto-generated method stub
		
	}

	public void setNickName(Object nickName2) {
		// TODO Auto-generated method stub
		
	}

	public void setProfileImage(Object profileImage2) {
		// TODO Auto-generated method stub
		
	}

	public void setEmail(Object email2) {
		// TODO Auto-generated method stub
		
	}

	public void setTel(Object tel2) {
		// TODO Auto-generated method stub
		
	}

	public void setRole(Object role2) {
		// TODO Auto-generated method stub
		
	}

	public void setStatus(Object status2) {
		// TODO Auto-generated method stub
		
	}

	public void setUserType(Object userType2) {
		// TODO Auto-generated method stub
		
	}
}