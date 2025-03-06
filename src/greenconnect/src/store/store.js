import {configureStore, createSlice} from '@reduxjs/toolkit';


let userSlice = createSlice({
    name : 'guest',
    initialState : {
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        nickname: null,
        userId: null
    },
    reducers : {

        loginUser(state, action){

            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.nickname = action.payload.nickname;
            state.userId = action.payload.userId;

            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            localStorage.setItem("nickname", action.payload.nickname);
            localStorage.setItem("userId", action.payload.userId);
        },
        logoutUser(state){
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.nickname = null;
            state.userId = null;

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("nickname");
            localStorage.removeItem("userId");
        }
    }
})

export let {loginUser, logoutUser} = userSlice.actions;


export default configureStore(
    {
        reducer: {
            user: userSlice.reducer,
        }
    }
)

