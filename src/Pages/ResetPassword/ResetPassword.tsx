import { Eye, EyeOff, Key, Lock, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import useResetPassword from "../../Hooks/useResetPassword";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: resetPassword, isPending, isSuccess } = useResetPassword();

  const resetPasswordSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    newPassword: Yup.string()
      .min(6, "Password too short")
      .required("Password is required"),
    reNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
      .required("Confirm password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      reNewPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: ({ email, newPassword }) => {
      resetPassword({ email, newPassword });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  return (
    <section className="max-w-lg mx-auto">
      <div className="rounded-lg p-8 mt-10 border border-gray-300 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Reset Password
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
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-600">
              New Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.newPassword}
              </p>
            )}
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
                name="reNewPassword"
                id="reNewPassword"
                value={formik.values.reNewPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formik.touched.reNewPassword && formik.errors.reNewPassword && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.reNewPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isPending ? "Submitting..." : "Submit New Password"}
          </button>
        </form>
      </div>
    </section>
  );
}
