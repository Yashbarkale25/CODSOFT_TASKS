import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/reset-password", {
        email,
        newPassword,
      });

      alert(res.data.message);

      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to reset password"
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
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="Enter New Password"
          className="w-full border p-3 rounded-lg mb-5"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Reset Password
        </button>

      </form>

    </div>
  );
}

export default ResetPassword;