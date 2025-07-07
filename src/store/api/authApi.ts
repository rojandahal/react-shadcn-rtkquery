import { apiRoutes } from "@/lib/api.routes";
import { baseApi } from "./baseApi";
import { type LoginRequest, type LoginResponse } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: apiRoutes.login,
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
