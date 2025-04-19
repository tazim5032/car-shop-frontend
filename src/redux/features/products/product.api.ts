import { TQueryParams } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/car/get-cars",
          method: "GET",
          params: params,
        };
      },
      providesTags: [
        "product",
        "deleteProduct",
        "createProduct",
        "orderProduct",
      ],
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: "/car/add-new-car",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["createProduct"],
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/car/${id}`,
        method: "GET",
      }),
      providesTags: ["singleProduct", "orderProduct"],
    }),

    updateProduct: builder.mutation({
      query: (args) => ({
        url: `/car/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["product", "singleProduct", "orderProduct"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/car/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteProduct"],
    }),

    createPayment: builder.mutation({
      query: (data) => ({
        url: "/order/create-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orderProduct", "singleProduct", "product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useCreatePaymentMutation,
} = productApi;
