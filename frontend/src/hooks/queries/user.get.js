import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/user.api";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getUser,
  });
};