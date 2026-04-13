import { verifyResetCode } from "../Api/auth.api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { VerifyResetCodePayLoad } from "../Types/auth.types";

export default function useVerifyResetCode() {
  return useMutation({
    mutationFn: (data: VerifyResetCodePayLoad) => verifyResetCode(data),

    onSuccess: () => {
      toast.success("Code verified successfully");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data.message || "Invalid reset code");
    },
  });
}
