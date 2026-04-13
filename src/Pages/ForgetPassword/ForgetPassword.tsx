import { useFormik } from "formik";
import { Mail } from "lucide-react";
import useForgetPassword from "../../Hooks/useForgetPassword";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ForgetPassword() {
  const { mutate: forgetPassword, isPending, isSuccess } = useForgetPassword();
  const navigate = useNavigate();

  const ForgetPasswordSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => forgetPassword(values),
    validationSchema: ForgetPasswordSchema,
  });

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/verify-reset-code");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  return (
    <section className="max-w-lg mx-auto">
      <div className="rounded-lg p-8 mt-10 border border-gray-300 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Forget Password
        </h2>
        <form onSubmit={formik.handleSubmit}>
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
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Send Code"}
          </button>
        </form>
      </div>
    </section>
  );
}
