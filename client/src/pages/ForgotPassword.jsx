import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/forgot-password", {
        email,
      });

      alert(res.data.message);

      navigate("/verify-otp", {
        state: { email },
      });

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-[420px]"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded-lg mb-5"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Send OTP
        </button>

      </form>

    </div>
  );
}

export default ForgotPassword;