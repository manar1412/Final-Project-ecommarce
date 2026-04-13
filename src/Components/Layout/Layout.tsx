import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import ScrollToTop from "../../Helper/ScrollToTop";
import OnTop from "../../Helper/OnTop";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <OnTop />
      <Navbar />

      <main role="main" className="flex-1 pt-16">
        <Outlet />
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}
