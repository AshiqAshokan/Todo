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
        })
})

export const {
    useLoginMutation,
    useRegisterMutation,
} = UserApiSlice