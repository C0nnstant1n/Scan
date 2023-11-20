import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { documentURL, histogramsURL, mainURL, objectURL } from "../api/vars";
import { Ihistograms, IhistogramsResponce } from "../api/histograms_interface";
import { IObjectData } from "../api/object_interfaces";
import { IDocRequest, IDocResponse } from "../api/doc_interfaces";
// import { BaseQueryArg } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
const token = localStorage.getItem("accessToken");
export const scanApi = createApi({
  reducerPath: "scanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: mainURL,
  }),
  endpoints: (build) => ({
    searchHistograms: build.mutation<IhistogramsResponce, Ihistograms>({
      query: (formData) => ({
        url: histogramsURL,
        method: "post",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    objectSearch: build.mutation<IObjectData, Ihistograms>({
      query: (formData) => ({
        url: objectURL,
        method: "post",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    documentSearch: build.mutation<IDocResponse[], IDocRequest>({
      query: (docId) => ({
        url: documentURL,
        method: "post",
        body: docId,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});
