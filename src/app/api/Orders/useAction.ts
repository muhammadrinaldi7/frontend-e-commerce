import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import { OrdersPayload, OrdersResponse, ResponseDefault } from "@/lib/types";

export const useActionOrder = () => {
  const { mutate: CreateOrder } = useMutation({
    mutationFn: async (payload: OrdersPayload) => {
      const res = await axiosClient.post<ResponseDefault<OrdersResponse>>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}orders`,
        payload
      );
      return res.data;
    },
  });
  return { CreateOrder };
};
