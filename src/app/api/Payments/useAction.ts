import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import { PaymentResponse, ResponseDefault } from "@/lib/types";

export interface PaymentPayload {
  order_id: string;
}
export const usePaymentAction = (url: string) => {
  const queryClient = useQueryClient();
  const { mutate: Payment } = useMutation({
    mutationFn: async (payload: PaymentPayload) => {
      const res = await axiosClient.post<ResponseDefault<PaymentResponse>>(
        url,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "allOrders",
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`,
        ],
      });
    },
  });
  return { Payment };
};
