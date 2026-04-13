import type {
  ForgetPasswordPayLoad,
  LoginPayLoad,
  ResetPasswordPayLoad,
  SignupPayLoad,
  VerifyResetCodePayLoad,
} from "../Types/auth.types";
import axiosInstance from "./axiosInstance";

export const signUp = async (data: SignupPayLoad) => {
  const response = await axiosInstance.post("/auth/signup", data);

  return response.data;
};

export const login = async (data: LoginPayLoad) => {
  const response = await axiosInstance.post("/auth/signin", data);

  return response.data;
};

export const forgetPassword = async (data: ForgetPasswordPayLoad) => {
  const response = await axiosInstance.post("/auth/forgotPasswords", data);

  return response.data;
};

export const verifyResetCode = async (data: VerifyResetCodePayLoad) => {
  const response = await axiosInstance.post("/auth/verifyResetCode", data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordPayLoad) => {
  const response = await axiosInstance.put("/auth/resetPassword", data);
  return response.data;
};
