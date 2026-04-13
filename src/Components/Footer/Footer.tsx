import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-300 pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* 🏢 Company */}
        <nav className="space-y-4" aria-label="Company links">
          <h2 className="text-lg font-bold">Company</h2>
          {["About Us", "Careers", "Blogs", "Gift Cards", "Magazine"].map(
            (item) => (
              <Link
                key={item}
                to="#"
                className="block text-sm transition hover:text-blue-600 dark:hover:text-blue-400"
              >
                {item}
              </Link>
            )
          )}
        </nav>

        {/* 🛠 Support */}
        <nav className="space-y-4" aria-label="Support links">
          <h2 className="text-lg font-bold">Support</h2>
          {[
            "Contact",
            "Legal Notice",
            "Privacy",
            "Terms & Conditions",
            "Sitemap",
          ].map((item) => (
            <Link
              key={item}
              to="#"
              className="block text-sm transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* ⚙️ Services */}
        <nav className="space-y-4" aria-label="Other services">
          <h2 className="text-lg font-bold">Other Services</h2>
          {["Service 1", "Service 2", "Service 3", "Service 4"].map(
            (service) => (
              <Link
                key={service}
                to="#"
                className="block text-sm transition hover:text-blue-600 dark:hover:text-blue-400"
              >
                {service}
              </Link>
            )
          )}
        </nav>

        {/* 📞 Contact */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Contact Us</h2>

          <div>
            <p className="text-sm">Mobile</p>
            <a
              href="tel:+20767887879"
              className="font-bold text-gray-800 dark:text-white hover:text-blue-600"
            >
              +20 989099898090
            </a>
          </div>

          <div>
            <p className="text-sm">Email</p>
            <a
              href="mailto:manar@gmail.com"
              className="font-bold text-gray-800 dark:text-white hover:text-blue-600"
            >
             manar@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* 🔻 Bottom Section */}
      <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6 max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} Webdev. All rights reserved
        </p>

        {/* 🌐 Social */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <span>Follow us:</span>

          <Link
            to="#"
            aria-label="Facebook"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            <Facebook size={20} />
          </Link>

          <Link to="#" aria-label="Twitter" className="hover:text-sky-500">
            <Twitter size={20} />
          </Link>

          <Link to="#" aria-label="Instagram" className="hover:text-rose-500">
            <Instagram size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
