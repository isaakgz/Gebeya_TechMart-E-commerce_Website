import { USERS_URL } from "../../constants";

import { apiSlice } from "../apiSclices/apiSclices";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; user: User },
      { email: string; password: string }
    >({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation<
      { token: string; user: User },
      { name: string; email: string; password: string }
    >({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<void, null>({
      query: () => ({ url: `${USERS_URL}/logout`, method: "POST" }),
    }),
    profile: builder.mutation<
      { _id: string; name: string; email: string; isAdmin: boolean }, // Output data type
      { name: string; email: string; password?: string }
    >({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    getUsers: builder.query<User[], null>({
      query: () => `${USERS_URL}`,
      providesTags: ["User"],
      keepUnusedDataFor: 5
    
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getUserDetails: builder.query<User, string>({
      query: (userId) => `${USERS_URL}/${userId}`,
      providesTags: ["User"],
      keepUnusedDataFor: 5
    }),
    updateUser: builder.mutation<User, { userId: string; user: User }>({
      query: ({ userId, user }) => ({
        url: `${USERS_URL}/${userId}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),




  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,

} = userApiSlice;
