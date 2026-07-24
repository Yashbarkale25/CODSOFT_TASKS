import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";

function VerifyOTP() {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      alert(res.data.message);

      navigate("/reset-password", {
        state: { email },
      });

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "OTP Verification Failed"
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
          Verify OTP
        </h1>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full border p-3 rounded-lg mb-5"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Verify OTP
        </button>

      </form>

    </div>
  );
}

export default VerifyOTP;