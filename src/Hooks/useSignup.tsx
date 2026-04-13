import toast from "react-hot-toast";
import { signUp } from "../Api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { SignupPayLoad } from "../Types/auth.types";

export default function useSignup() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: SignupPayLoad) => signUp(data),

    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },

    onError: (error: any) => {
      toast.error(error.response.data.message || "Signup failed");
    },
  });
}
