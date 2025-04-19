import { TQueryParams } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/user",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["userStatus"],
    }),
    getSingleUser: builder.query({
      query: (email) => {
        return {
          url: `/user/${email}`,
          method: "GET",
        };
      },
    }),

    blockUnblockUser: builder.mutation({
      query: ({ id, queryParams }) => {
        const params = new URLSearchParams();
        if (queryParams) {
          queryParams.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/user/${id}`,
          method: "PATCH",
          params: params,
        };
      },
      invalidatesTags: ["userStatus"],
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: `/user/change-password`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useBlockUnblockUserMutation,
  useGetSingleUserQuery,
  useChangePasswordMutation,
} = userApi;
