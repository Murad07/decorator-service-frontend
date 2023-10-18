import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://l2a6-pc-builder-murad07.vercel.app/",
    baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        headers.set("authorization", token);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAvailableServices: builder.query({
      query: () => "/service?serviceStatus=Available",
    }),
    getUpcomingServices: builder.query({
      query: () => "/service?serviceStatus=Upcoming",
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
    getUserProfile: builder.query({
      query: () => "/profile",
    }),
    updateUser: builder.mutation({
      query: ({ userId, ...updateData }) => ({
        url: `users/6527b90a7bcba07dd47ab553`, // Include the user's ID in the URL
        method: "PATCH", // You may need to change this to the appropriate HTTP method
        body: updateData,
      }),
    }),
  }),
});

export const {
  useGetAvailableServicesQuery,
  useGetUpcomingServicesQuery,
  useLoginMutation,
  useSignupMutation,
  useGetUserProfileQuery,
  useUpdateUserMutation,
} = apiSlice;
