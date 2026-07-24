import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaUserGraduate, FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../api/axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
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
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(res.data.message);

      navigate("/");
    } catch (error) {
      toast.error(
  error.response?.data?.message || "Login Failed"
);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 flex items-center justify-center px-5">

      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-10">

          <h1 className="text-5xl font-extrabold">
            Job Portal
          </h1>

          <p className="text-center mt-6 text-lg opacity-90">
            Find your dream job and build your career with India's modern recruitment platform.
          </p>

          <div className="mt-12 text-8xl">
            💼
          </div>

        </div>

        {/* Right Side */}
        <div className="p-10">

          <h2 className="text-4xl font-bold text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Login to continue
          </p>

          <form onSubmit={handleSubmit}>

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
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
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
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="recruiter">Recruiter</option>
              </select>

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-lg transition"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

                  <Link
          to="/forgot-password"
          className="text-blue-600"
        >
          Forgot Password?
        </Link>
        </div>

      </div>

    </div>
  );
}

export default Login;