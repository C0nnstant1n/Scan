import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { documentURL, histogramsURL, mainURL, objectURL } from "../api/vars";
import { IHistograms, IHistogramsResponse } from "../api/histograms_interface";
import { IObjectData } from "../api/object_interfaces";
import { IDocRequest, IDocResponse } from "../api/doc_interfaces";


const token = localStorage.getItem("accessToken");

export const scanApi = createApi({
  reducerPath: "scanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: mainURL,
  }),
  endpoints: (build) => ({
    searchHistograms: build.mutation<IHistogramsResponse, IHistograms>({
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
    objectSearch: build.mutation<IObjectData, IHistograms>({
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
