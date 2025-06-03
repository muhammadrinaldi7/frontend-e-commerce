import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import { OrdersResponse, ResponseDefault } from "@/lib/types";

export const useFetchAllOrders = () => {
  return useQuery({
    queryKey: ["allOrders", `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`],
    queryFn: async () => {
      const res = await axiosClient.get<ResponseDefault<OrdersResponse[]>>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}orders`
      );
      return res.data;
    },
  });
};

export const useFetchOrdersAll = () => {
  return useQuery({
    queryKey: ["ordersAll"],
    queryFn: async () => {
      const res = await axiosClient.get<ResponseDefault<OrdersResponse[]>>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}get-allOrders`
      );
      return res.data;
    },
  });
};

export const useFetchDetailOrder = (url: string) => {
  return useQuery({
    queryKey: ["detailOrder"],
    queryFn: async () => {
      const res = await axiosClient.get<ResponseDefault<OrdersResponse>>(
        `${url}`
      );
      return res.data;
    },
  });
};
