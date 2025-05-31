import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import { PaymentResponse, ResponseDefault } from "@/lib/types";

export interface PaymentPayload {
  order_id: string;
}
export const usePaymentAction = (url: string) => {
  const { mutate: Payment } = useMutation({
    mutationFn: async (payload: PaymentPayload) => {
      const res = await axiosClient.post<ResponseDefault<PaymentResponse>>(
        url,
        payload
      );
      return res.data;
    },
  });
  return { Payment };
};
