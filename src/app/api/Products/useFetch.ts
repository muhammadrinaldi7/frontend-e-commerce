import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import { ProductResponse, ResponseDefault } from "@/lib/types";

export const useFetchAllProducts = (url: string) => {
  return useQuery({
    queryKey: ["allProducts", url],
    queryFn: async () => {
      const res = await axiosClient.get<ResponseDefault<ProductResponse[]>>(
        url
      );
      return res.data;
    },
  });
};
