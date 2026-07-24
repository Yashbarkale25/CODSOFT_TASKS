import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserGraduate,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", formData);

      toast.success(res.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(
  error.response?.data?.message || "Registration Failed"
);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 flex items-center justify-center px-5">

      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-10">

          <h1 className="text-5xl font-extrabold">
            Join Job Portal
          </h1>

          <p className="text-center mt-6 text-lg opacity-90">
            Create your account and start applying to thousands of jobs from top companies.
          </p>

          <div className="text-8xl mt-12">
            🚀
          </div>

        </div>

        {/* Right Side */}
        <div className="p-10">

          <h2 className="text-4xl font-bold text-center mb-2">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Register to continue
          </p>

          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="relative mb-5">

              <FaUser className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* Email */}
            <div className="relative mb-5">

              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* Phone */}
            <div className="relative mb-5">

              <FaPhone className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* Password */}
            <div className="relative mb-5">

              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            {/* Role */}
            <div className="relative mb-8">

              <FaUserGraduate className="absolute left-4 top-4 text-gray-400" />

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">
                  Select Role
                </option>

                <option value="student">
                  Student
                </option>

                <option value="recruiter">
                  Recruiter
                </option>

              </select>

            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold text-lg transition"
            >
              Create Account
            </button>

          </form>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;