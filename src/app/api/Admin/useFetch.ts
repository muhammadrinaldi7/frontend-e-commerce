import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import { DashboardResponse, ResponseDefault, UserResponse } from "@/lib/types";

export const useFetchCounter = () => {
  return useQuery({
    queryKey: ["counter"],
    queryFn: async () => {
      const res = await axiosClient.get<ResponseDefault<DashboardResponse>>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}dashboard`
      );
      return res.data;
    },
  });
};

export const useFetchAllUsers = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosClient.get<ResponseDefault<UserResponse[]>>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}all-users`
      );
      return res.data;
    },
  });
};
