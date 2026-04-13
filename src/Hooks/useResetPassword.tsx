import toast from "react-hot-toast";
import { resetPassword } from "../Api/auth.api";
import { useMutation } from "@tanstack/react-query";
import type { ResetPasswordPayLoad } from "../Types/auth.types";

export default function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordPayLoad) => resetPassword(data),

    onSuccess: () => {
      toast.success("Password reset successfully");
      localStorage.removeItem("resetEmail");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to reset password");
    },
  });
}
