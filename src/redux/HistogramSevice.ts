import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
// import { histogramsURL, mainURL } from "../api/vars";
// import { BaseQueryArg } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

export const histogramsApi = createApi({
  reducerPath: "histogramsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => ({
        url: "/posts",
      }),
    }),
  }),
});
