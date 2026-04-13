import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Categories from "./Pages/Categories/Categories";
import CategoryDetails from "./Pages/CategoryDetails/CategoryDetails";
import Products from "./Pages/Products/Products";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import CartPage from "./Pages/CartPage/CartPage";
import ProductsDetails from "./Pages/ProductsDetails/ProductsDetails";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import VerifyResetCode from "./Pages/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./Context/AuthContext";
import ThemeProvider from "./Context/ThemeContext";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute, {
  GuestRoute,
} from "./Components/ProtectedRoute/ProtectedRoute";
import CheckOut from "./Pages/CheckOut/CheckOut";
import AllOrders from "./Pages/AllOrders/AllOrders";
import Wishlist from "./Pages/Wishlist/Wishlist";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "products", element: <Products /> },
        { path: "products-details/:id", element: <ProductsDetails /> },
        { path: "categories", element: <Categories /> },
        { path: "categories/:id", element: <CategoryDetails /> },

        // Guest Routes
        {
          path: "login",
          element: (
            <GuestRoute>
              <Login />
            </GuestRoute>
          ),
        },
        {
          path: "register",
          element: (
            <GuestRoute>
              <Register />
            </GuestRoute>
          ),
        },
        // Protected Routes
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "check-out",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        { path: "forgot-password", element: <ForgetPassword /> },
        { path: "verify-reset-code", element: <VerifyResetCode /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
  ]);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <RouterProvider router={routes} />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
