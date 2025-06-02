import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import {
  CategoryResponse,
  DashboardResponse,
  OrdersResponse,
  ProductPayload,
  ProductResponse,
  ResponseDefault,
  updateProductPayload,
} from "@/lib/types";
import { CategoriesPayload } from "@/app/admin/categories/new/page";

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
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
    },
  });
  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosClient.delete<ResponseDefault<ProductResponse>>(
        `${url}${id}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
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
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
    },
  });

  const { mutate: deleteCategory } = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosClient.delete(`${url}${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
    },
  });

  const { mutate: addCategory } = useMutation({
    mutationFn: async (payload: CategoriesPayload) => {
      const res = await axiosClient.post<ResponseDefault<CategoryResponse>>(
        url,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Categories", url] });
    },
  });

  const { mutate: delivery } = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosClient.put<ResponseDefault<OrdersResponse>>(
        `${url}${id}`,
        {
          status: "delivered",
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordersAll"] });
    },
  });

  const { mutate: updateProduct } = useMutation({
    mutationFn: async (payload: updateProductPayload) => {
      axiosClient.defaults.headers.post["Content-Type"] = "multipart/form-data";
      const res = await axiosClient.put<ResponseDefault<ProductResponse>>(
        url,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
    },
  });

  // const { mutate: deleteProduct } = useMutation({
  //   mutationFn: async (id: string) => {
  //     const res = await axiosClient.delete<ResponseDefault<ProductResponse>>(
  //       `${url}${id}`
  //     );
  //     return res.data;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["allProducts"] });
  //   },
  // });

  return {
    delivery,
    updateProduct,
    addCategory,
    count,
    addProduct,
    deleteProduct,
    deleteCategory,
    PromoteAdmin,
    uploadGallery,
  };
};
