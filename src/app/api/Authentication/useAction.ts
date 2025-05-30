import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  ResponseDefault,
} from "@/lib/types";

export const useActionAuth = (url: string) => {
  const { mutate: Login } = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await axiosClient.post<LoginResponse>(url, payload);
      return res.data;
    },
  });
  const { mutate: Register } = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await axiosClient.post<ResponseDefault<LoginResponse>>(
        url,
        payload
      );
      return res.data;
    },
  });
  const { mutate: PromoteAdmin } = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosClient.post(`${url}/${id}`);
      return res.data;
    },
  });
  return { Login, Register, PromoteAdmin };
};
