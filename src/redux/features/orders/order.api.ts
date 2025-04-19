import { TQueryParams } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrdersByEmail: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/car/orders/all-cars`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["orderProduct"],
    }),
    getAllSuccessfullOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/car/order/all-orders`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["orderProduct"],
    }),
  }),
});

export const { useGetAllOrdersByEmailQuery, useGetAllSuccessfullOrdersQuery } =
  orderApi;
