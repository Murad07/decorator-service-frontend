import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://l2a6-pc-builder-murad07.vercel.app/",
    baseUrl: "http://localhost:5000/api/v1",
  }),
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => "/service",
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useGetServicesQuery, useLoginMutation, useSignupMutation } =
  apiSlice;
