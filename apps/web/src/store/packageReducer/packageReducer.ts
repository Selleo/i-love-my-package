import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MyPackage {
  id: number;
  name: string;
  versions?: Version[];
  usedBy?: UsedBy[];
}
interface Version {
  userId: number;
  value: string;
}

interface User {
  id: number;
  email: string;
}

interface UsedBy {
  user: User;
  version: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4002",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const packageReducer = createApi({
  reducerPath: "packages",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getPackages: builder.mutation<MyPackage, string>({
      query: (name) => ({
        url: "package",
        method: "POST",
        body: {
          search: name,
        },
      }),
    }),
    uploadPackage: builder.mutation<MyPackage, string>({
      query: (file) => ({
        url: "package/upload",
        method: "POST",
        body: {
          file,
        },
        headers: {
          "content-type": (file as unknown as File).type,
          "content-length": `${(file as unknown as File).size}`,
        },
      }),
    }),
  }),
});

const initialState = {
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

const authReducer = authSlice.reducer;

export const { useGetPackagesMutation, useUploadPackageMutation } =
  packageReducer;

export default authReducer;
