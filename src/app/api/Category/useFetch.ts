import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import { CategoryResponse, ResponseDefault } from "@/lib/types";

export const useFetchAllCategories = () => {
  return useQuery({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const res = await axiosClient.get<ResponseDefault<CategoryResponse[]>>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}categories`
      );
      return res.data;
    },
  });
};
