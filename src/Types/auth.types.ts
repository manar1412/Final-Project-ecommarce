export interface SignupPayLoad {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface LoginPayLoad {
  email: string;
  password: string;
}

export interface ForgetPasswordPayLoad {
  email: string;
}

export interface VerifyResetCodePayLoad {
  resetCode: string;
}

export interface ResetPasswordPayLoad {
  email: string;
  newPassword: string;
}
