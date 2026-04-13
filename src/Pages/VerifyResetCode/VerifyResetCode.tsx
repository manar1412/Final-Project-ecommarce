import { useNavigate } from "react-router-dom";
import useResetCode from "../../Hooks/useVerifyResetCode";
import { useFormik } from "formik";
import { Code } from "lucide-react";
import { useEffect } from "react";

export default function VerifyResetCode() {
  const navigate = useNavigate();

  const { mutate: resetCode, isPending, isSuccess } = useResetCode();

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: (values) => {
      resetCode(values);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/reset-password");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  return (
    <section className="max-w-lg mx-auto">
      <div className="rounded-lg p-8 mt-10 border border-gray-300 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Verify Code
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-600">Code</label>
            <div className="relative">
              <Code
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                type="text"
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                name="resetCode"
                id="resetCode"
                value={formik.values.resetCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Submit Code"}
          </button>
        </form>
      </div>
    </section>
  );
}
