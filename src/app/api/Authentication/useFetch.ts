import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import { ResponseDefault, UserResponse } from "@/lib/types";

export const useFetchProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosClient.get<ResponseDefault<UserResponse>>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}getAuth`
      );
      return res.data;
    },
  });
};
