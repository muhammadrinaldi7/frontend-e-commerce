import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  ResponseDefault,
} from "@/lib/types";
export interface UpdateAvatar {
  avatar: File | null;
}
export const useActionAuth = (url: string) => {
  const queryClient = useQueryClient();
  const { mutate: Login } = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await axiosClient.post<LoginResponse>(url, payload);
      return res.data;
    },
  });
  const { mutate: Register } = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      axiosClient.defaults.headers.post["Content-Type"] = "multipart/form-data";
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

  const { mutate: updateAvatar } = useMutation({
    mutationFn: async (payload: UpdateAvatar) => {
      axiosClient.defaults.headers.post["Content-Type"] = "multipart/form-data";
      const res = await axiosClient.post(`${url}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
  return { Login, Register, updateAvatar, PromoteAdmin };
};
