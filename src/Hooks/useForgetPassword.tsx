import toast from "react-hot-toast";
import { forgetPassword } from "../Api/auth.api";
import { useMutation } from "@tanstack/react-query";
import type { ForgetPasswordPayLoad } from "../Types/auth.types";

export default function useForgetPassword() {
  return useMutation({
    mutationFn: (data: ForgetPasswordPayLoad) => forgetPassword(data),

    onSuccess: (data) => {
      toast.success(data.message);
      localStorage.setItem("resetEmail", data.email);
    },

    onError: (error: any) => {
      toast.error(error?.response?.data.message || "Failed to send reset link");
    },
  });
}
