import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface MyPackage {
  id: number
  name: string
  versions?: Version[]
  usedBy?: UsedBy[]
}
interface Version {
  userId: number
  value: string
}

interface User {
  id: number
  email: string
}

interface UsedBy {
  user: User
  version: string
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:4000',
  prepareHeaders: (headers) => {
    headers.set('authorization', 'email')
    return headers
  },
})

export const packageReducer = createApi({
  reducerPath: 'packages',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getPackages: builder.mutation<MyPackage, string>({
      query: (name) => ({
        url: 'package',
        method: 'POTS',
        body: {
          search: name,
        },
      }),
    }),
  }),
})

export const { useGetPackagesMutation } = packageReducer
