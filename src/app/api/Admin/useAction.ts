import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import {
  DashboardResponse,
  ProductPayload,
  ProductResponse,
  ResponseDefault,
} from "@/lib/types";

export const useActionAdmin = (url: string) => {
  const queryClient = useQueryClient();
  const { mutate: count } = useMutation({
    mutationFn: async () => {
      const res = await axiosClient.get<DashboardResponse>(`${url}`);
      return res.data;
    },
  });
  const { mutate: addProduct } = useMutation({
    mutationFn: async (payload: ProductPayload) => {
      axiosClient.defaults.headers.post["Content-Type"] = "multipart/form-data";
      const res = await axiosClient.post<ResponseDefault<ProductResponse>>(
        url,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allProducts", url] });
    },
  });
  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosClient.delete<ResponseDefault<ProductResponse>>(
        `${url}/${id}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allProducts", url] });
    },
  });
  const { mutate: uploadGallery } = useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload: { gallery_product: File[] | null };
    }) => {
      axiosClient.defaults.headers.post["Content-Type"] = "multipart/form-data";
      const res = await axiosClient.post<ResponseDefault<ProductResponse>>(
        `${url}`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allProducts", url] });
    },
  });

  const { mutate: PromoteAdmin } = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosClient.post(`${url}${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers", url] });
    },
  });

  return { count, addProduct, deleteProduct, PromoteAdmin, uploadGallery };
};
