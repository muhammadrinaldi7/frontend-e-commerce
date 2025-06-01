import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import { ProductResponse, ResponseDefault } from "@/lib/types";

export const useFetchAllProducts = (url: string) => {
  return useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosClient.get<ResponseDefault<ProductResponse[]>>(
        url
      );
      return res.data;
    },
  });
};

export const useFetchDetailProduct = (url: string) => {
  return useQuery({
    queryKey: ["detailProduct", url],
    queryFn: async () => {
      const res = await axiosClient.get<ResponseDefault<ProductResponse>>(url);
      return res.data;
    },
  });
};

export const useSearchProduct = (query: string) => {
  return useQuery({
    queryKey: ["searchProduct", query],
    queryFn: async () => {
      const res = await axiosClient.get<ResponseDefault<ProductResponse[]>>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}search/products`,
        { params: { query } }
      );
      return res.data;
    },
    enabled: !!query,
  });
};

export const useFetchProductsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["products", "category", categoryId],
    queryFn: async () => {
      const { data } = await axiosClient.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}products/category/${categoryId}`
      );
      return data;
    },
    enabled: !!categoryId,
  });
};
