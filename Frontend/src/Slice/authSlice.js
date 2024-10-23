import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userInfo: localStorage.getItem('userInfo') !== 'undefined'
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
    token: localStorage.getItem('accessToken') || null,
  };

  const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {
      setCredentials: (state, action) => {
        const { user, token } = action.payload;
        state.userInfo = user;
        state.token = token;
        if (user) {
          localStorage.setItem('userInfo', JSON.stringify(user));
        } else {
          localStorage.removeItem('userInfo');
        }
        localStorage.setItem('accessToken', token);
      },
      clearCredentials: (state) => {
        state.userInfo = null;
        state.token = null;
        localStorage.removeItem('userInfo');
        localStorage.removeItem('accessToken');
  
      },
    
    },
  });
  
  export const { setCredentials, clearCredentials} = authSlice.actions;
  export default authSlice.reducer;
  