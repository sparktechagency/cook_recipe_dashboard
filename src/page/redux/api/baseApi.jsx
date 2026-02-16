import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://backend.koumanisdietapp.com",
  // baseUrl: "http://172.252.13.86:5005",
  // prepareHeaders: (headers) => {
  //   const token = JSON.parse(localStorage.getItem("accessToken"));
  //   if (token) {
  //     headers.set("Authorization", `${token}`);
  //   }
  //   return headers;
  // },
  prepareHeaders: (headers, { getState }) => {
    const token = getState().logInUser.token;
    
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["overview", "host", "updateProfile", "category"],
  endpoints: () => ({}),
});

// export const imageUrl = "http://172.252.13.86:5005";
// asdfsf
