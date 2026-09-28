import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../services/user.api";

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: createUser,
  });
};
