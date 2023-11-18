import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { histogramsURL, mainURL } from "../api/vars";
// import { BaseQueryArg } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
const token = localStorage.getItem("accessToken");
export const histogramsApi = createApi({
  reducerPath: "histogramsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: mainURL,
  }),
  endpoints: (build) => ({
    searchHistograms: build.mutation({
      query: (formData) => ({
        url: histogramsURL,
        method: "post",
        body: formData,
        headers: {
          Accept: "aplication/json",
          "Content-Type": "aplication/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});
