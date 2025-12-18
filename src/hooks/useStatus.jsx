import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const useStatus = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: status, isLoading: isStatusLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["status", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/user/status?email=${user?.email}`
      );
      console.log("from status have", data.status);
      return data.status;
    },
  });
  return [status, isStatusLoading];
};

export default useStatus;
