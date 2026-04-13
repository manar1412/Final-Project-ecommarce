import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../Hooks/useLogin";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();

  const LoginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password too short")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => login(values),
    validationSchema: LoginSchema,
  });

  return (
    <section className="max-w-lg mx-auto">
      <div className="rounded-lg p-8 mt-10 border border-gray-300 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          LOGIN
        </h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-600">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                type="email"
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                formik.touched.email && formik.errors.email
                  ? "max-h-20 opacity-100 mt-1"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            </div>
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div>
              <div className="flex justify-end mt-1">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                formik.touched.password && formik.errors.password
                  ? "max-h-20 opacity-100 mt-1"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="mt-6 w-full flex justify-center items-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isPending ? <Loader2 className="animate-spin w-6 h-6" /> : "LOGIN"}
          </button>
        </form>
        <div className="mt-8 text-center pt-6 border-t border-gray-200 dark:border-gray-600">
          <p className="text-gray-600 dark:text-gray-400">
            Do you have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-300 cursor-pointer"
            >
              REGISTER NOW!
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
