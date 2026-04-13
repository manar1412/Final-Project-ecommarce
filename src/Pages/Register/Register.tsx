import {
  Eye,
  EyeOff,
  Key,
  Loader2,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useSignup from "../../Hooks/useSignup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: signup, isPending, isSuccess } = useSignup();

  const RegisterSchema = Yup.object({
    name: Yup.string().min(2, "Too Short!").required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password too short")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: (values) => signup(values),
    validationSchema: RegisterSchema,
  });

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => navigate("/login"), 1500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <section className="max-w-lg mx-auto">
      <div className="rounded-lg p-8 mt-10 border border-gray-300 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          REGISTER NOW
        </h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-600">Name</label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                name="name"
                id="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                formik.touched.name && formik.errors.name
                  ? "max-h-20 opacity-100 mt-1"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            </div>
          </div>

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
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                type="email"
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

          {/* Phone */}
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-600">
              Phone
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                name="phone"
                id="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="tel"
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                formik.touched.phone && formik.errors.phone
                  ? "max-h-20 opacity-100 mt-1"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-red-500 text-sm">{formik.errors.phone}</p>
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
                className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
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

          {/* Confirm Password */}
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-600">
              Confirm Password
            </label>
            <div className="relative">
              <Key
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                name="rePassword"
                id="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                type="button"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                formik.touched.rePassword && formik.errors.rePassword
                  ? "max-h-20 opacity-100 mt-1"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-red-500 text-sm">{formik.errors.rePassword}</p>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="mt-6 w-full flex justify-center items-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isPending ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : (
              "REGISTER NOW"
            )}
          </button>
        </form>
        <div className="mt-8 text-center pt-6 border-t border-gray-200 dark:border-gray-600">
          <p className="text-gray-600 dark:text-gray-400">
            Do you have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-300 cursor-pointer"
            >
              LOGIN
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
