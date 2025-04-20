import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../features/store";
import { toast } from "sonner";
import { logOut, setUser } from "../features/auth/AuthSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://car-shop-backend-amber.vercel.app/api",
    credentials: "include",
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token;
        if(token) {
            headers.set("authorization", `${token}`);
        }
        return headers;
    }
})

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);

    if(result.error?.status === 404) {
        
        toast.error("something went wrong. Please Try Again..!");
    }
    else if(result.error?.status === 403) {
        toast.error("something went wrong. Please Try Again..!");
    }
    else if(result.error?.status === 'FETCH_ERROR') {
        toast.error('Something is in Server...')
    }
    else if(result.error?.status === 401) {
        const res = await fetch("https://car-shop-backend-amber.vercel.app/api/auth/refresh-token", {
            method: "POST",
            credentials: "include",
        })
        const data = await res.json();
        if(data?.data?.accessToken) {
            const user = (api.getState() as RootState).auth.user;

            api.dispatch(setUser({user, token: data?.data?.accessToken}));

            result = await baseQuery(args, api, extraOptions);
        }
        else {
            api.dispatch(logOut());
        }
    }

    return result;

};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["product", "deleteProduct", "createProduct", "userStatus", 'singleProduct', 'orderProduct'],
  endpoints: () => ({}),
});


