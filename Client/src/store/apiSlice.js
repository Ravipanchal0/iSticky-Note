import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
});

const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Auth", "Note"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
