import { apiSlice } from "./apiSlice";
const USERS_URL='/api/user'

export const UserApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/login`,
              method: 'POST',
              body: data,
            }),
          }),
          register: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/register`,
              method:'POST',
              body: data,
              }),
            }),
            googleSignIn: builder.mutation({
              query: (token) => ({
                url: `${USERS_URL}/google-signin`, 
                method: 'POST',
                body: { token }, 
              }),
            }),
             googleSignUp: builder.mutation({
              query: (token) => ({
                url: `${USERS_URL}/google-signup`,
                method: 'POST',
                body: { token },
              }),
            }),
        }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGoogleSignInMutation,
    useGoogleSignUpMutation
} = UserApiSlice
