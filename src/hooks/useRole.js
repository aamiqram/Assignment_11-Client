import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axiosSecure from "../utils/axiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();

  const { data: roleData, isLoading: roleLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role/${user.email}`);
      return res.data;
    },
  });

  return [roleData?.role || "user", roleLoading || loading];
};

export default useRole;
