import { configureStore, createSlice } from '@reduxjs/toolkit';

let userSlice = createSlice({
    name: 'guest',
    initialState: {
        isAuthenticated: false, // 인증 여부
        accessToken: null, // 액세스 토큰
        refreshToken: null, // 리프레시 토큰
        nickname: null, // 사용자 닉네임
        userId: null, // 사용자 ID
        email: null, // 사용자 이메일
        tel : null,
        userName : null
        
    },
    reducers: {
        // 로그인 액션
        loginUser(state, action) {
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken || null; // 토큰 없으면 null
            state.refreshToken = action.payload.refreshToken || null;
            state.nickname = action.payload.nickname;
            state.userId = action.payload.userId;
            state.email = action.payload.email;
            state.email = action.payload.tel;
            state.email = action.payload.userName;

            // 로컬 스토리지 저장
            localStorage.setItem("accessToken", action.payload.accessToken || "");
            localStorage.setItem("refreshToken", action.payload.refreshToken || "");
            localStorage.setItem("nickname", action.payload.nickname);
            localStorage.setItem("userId", action.payload.userId);
            localStorage.setItem("email", action.payload.email);
            localStorage.setItem("email", action.payload.tel);
            localStorage.setItem("email", action.payload.userName);
        },
        // 로그아웃 액션
        logoutUser(state) {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.nickname = null;
            state.userId = null;
            state.email = null;
            state.tel = null;
            state.userName = null;

            // 로컬 스토리지 제거
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("nickname");
            localStorage.removeItem("userId");
            localStorage.removeItem("email");
            localStorage.removeItem("tel");
            localStorage.removeItem("userName");
        },
        // 상태 초기화 액션 (추가)
        resetUser(state) {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.nickname = null;
            state.userId = null;
            state.email = null;
            state.tel = null;
            state.userName = null;

            // 로컬 스토리지 초기화
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("nickname");
            localStorage.removeItem("userId");
            localStorage.removeItem("email");
            localStorage.removeItem("tel");
            localStorage.removeItem("userName");
        }
    }
});

// 액션 내보내기
export let { loginUser, logoutUser, resetUser } = userSlice.actions;

// Redux 스토어 설정
export default configureStore({
    reducer: {
        user: userSlice.reducer, // 리듀서 등록
    }
});
