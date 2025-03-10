import {configureStore, createSlice} from '@reduxjs/toolkit';


let userSlice = createSlice({
    name : 'guest',
    initialState : {
        isAuthenticated: false, //인증여부
        accessToken: null, //엑세스 토큰
        refreshToken: null, //리프레시 토큰
        nickname: null, //사용자 닉네임
        userId : null //사용자 ID
    },
    reducers : {

        loginUser(state, action){

            //로그인시 액션
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.nickname = action.payload.nickname;
            state.userId = action.payload.userId;

            //로컬 스토리지에 저장
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            localStorage.setItem("nickname", action.payload.nickname);
            localStorage.setItem("userId", action.payload.userId);
        },
        //로그아웃 액션
        logoutUser(state){
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.nickname = null;
            state.userId = null;

            //로컬 스토리지에서 제거
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("nickname");
            localStorage.removeItem("userId");
        }
    }
})
 // 다른 곳에서 액션 사용 할 수 있게 내보내기
export let {loginUser, logoutUser} = userSlice.actions;

// Redux 스토어 설정
export default configureStore(
    {
        reducer: {
            user: userSlice.reducer, //리듀서 등록
        }
    }
)

