import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function CreateCompany() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: null,
    createdBy: user?._id || "",
  });

  const handleChange = (e) => {
    if (e.target.name === "logo") {
      setFormData({
        ...formData,
        logo: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("website", formData.website);
      data.append("location", formData.location);
      data.append("createdBy", formData.createdBy);

      if (formData.logo) {
        data.append("logo", formData.logo);
      }

      const res = await API.post("/companies", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);

      navigate("/companies");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to create company"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-[650px]"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Company
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
          required
        />

        <textarea
          name="description"
          placeholder="Company Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
          rows="4"
        />

        <input
          type="text"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <label className="font-semibold">
          Company Logo
        </label>

        <input
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Create Company
        </button>
      </form>
    </div>
  );
}

export default CreateCompany;