import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { userApiToUser } from "../adapters/userApiToUser";
import fetchBaseQueryWithRefresh from "../lib/rtkCustomBaseQuery";
import { ApiSuccessResponse, User, UserFromApi } from "../models";

interface SingInArgs {
    email: string
    password: string
}

interface SingUpArgs {
    username: string
    email: string
    password: string
    age: number
    profile_data?: any
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQueryWithRefresh,
    endpoints: (builder) => ({
        authUser: builder.query<User, void>({
            query: () => "/auth/me",
            transformResponse(response: ApiSuccessResponse<UserFromApi>) {
                return userApiToUser(response.data)
            }
        }),
        signIn: builder.mutation<ApiSuccessResponse<{ user: UserFromApi, access_token: string }>, SingInArgs>({
            query: (credentials) => ({
                url: "auth/signin",
                method: "POST",
                body: credentials,
                credentials: 'include'
            })
        }),
        signUp: builder.mutation<ApiSuccessResponse<{ user: UserFromApi, access_token: string }>, SingUpArgs>({
            query: (userData) => ({
                url: "auth/signup",
                method: "POST",
                body: userData,
                credentials: 'include',
            })
        })
    })
})

export const { useAuthUserQuery, useSignInMutation, useSignUpMutation } = authApi



