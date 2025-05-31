import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import { OrdersPayload, OrdersResponse, ResponseDefault } from "@/lib/types";

export const useActionOrder = () => {
  const queryQlient = useQueryClient();
  const { mutate: CreateOrder } = useMutation({
    mutationFn: async (payload: OrdersPayload) => {
      const res = await axiosClient.post<ResponseDefault<OrdersResponse>>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}orders`,
        payload
      );
      return res.data;
    },
  });
  const { mutate: deleteOrder } = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosClient.delete<ResponseDefault<OrdersResponse>>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}orders/${id}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryQlient.invalidateQueries({ queryKey: ["allOrders"] });
    },
  });
  return { CreateOrder, deleteOrder };
};
