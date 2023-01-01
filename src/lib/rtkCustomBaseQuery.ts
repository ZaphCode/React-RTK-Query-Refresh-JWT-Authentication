import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { ApiSuccessResponse } from "../models";
import { Store } from "../store";
import { logout, refreshToken } from "../store/slices/authSlice";

const baseUrl = `http://localhost:8600/api`;

const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders(headers, api) {
    const token = (api.getState() as Store).auth.access_token;
    if (token) {
      headers.set("x-access-token", token);
    }
    return headers;
  },
});


const fetchBaseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {

    if (!mutex.isLocked()) {

      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          {
            credentials: "include",
            url: "/auth/refresh",
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {

          const token = (refreshResult.data as ApiSuccessResponse<string>).data

          api.dispatch(refreshToken(token))


          result = await baseQuery(args, api, extraOptions);
        } else {
        
          api.dispatch(logout);
        }
      } finally {
        
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default fetchBaseQueryWithRefresh;
