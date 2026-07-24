import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}
          <div>

            <h2 className="text-3xl font-bold text-blue-500">
              JobPortal
            </h2>

            <p className="text-gray-400 mt-5 leading-7">
              Find your dream job with India's growing job portal.
              Connecting talented students with trusted companies.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/jobs" className="hover:text-white">
                  Jobs
                </Link>
              </li>

              <li>
                <Link to="/companies" className="hover:text-white">
                  Companies
                </Link>
              </li>

              <li>
                <Link to="/login" className="hover:text-white">
                  Login
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-gray-400">

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt />
                India
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope />
                support@jobportal.com
              </div>

              <div className="flex items-center gap-3">
                <FaPhone />
                +91 9876543210
              </div>

            </div>

          </div>

          {/* Social */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Follow Us
            </h3>

            <div className="flex gap-5 text-2xl">

              <FaFacebook className="hover:text-blue-500 cursor-pointer transition" />

              <FaInstagram className="hover:text-pink-500 cursor-pointer transition" />

              <FaLinkedin className="hover:text-blue-400 cursor-pointer transition" />

              <FaGithub className="hover:text-gray-300 cursor-pointer transition" />

            </div>

          </div>

        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500">

          © {new Date().getFullYear()} JobPortal. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;