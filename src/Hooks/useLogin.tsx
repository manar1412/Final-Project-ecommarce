import toast from "react-hot-toast";
import { login } from "../Api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { LoginPayLoad } from "../Types/auth.types";

export default function useLogin() {
  const { login: saveToken } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginPayLoad) => login(data),

    onSuccess: (data) => {
      if (!data.token) return;
      toast.success(data.message);
      saveToken(data.token);
      navigate("/");
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
}
