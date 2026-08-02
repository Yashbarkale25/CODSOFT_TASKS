import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";


function EditCompany() {
  const { id } = useParams();
  const navigate = useNavigate();
const [currentLogo, setCurrentLogo] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: null,
  });

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const res = await API.get(`/companies/${id}`);

      setFormData({
        name: res.data.name,
        description: res.data.description,
        website: res.data.website,
        location: res.data.location,
        logo: null,
      });
      setCurrentLogo(res.data.logo);
    } catch (error) {
      console.log(error);
      alert("Failed to load company");
    }
  };

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

      if (formData.logo) {
        data.append("logo", formData.logo);
      }

      const res = await API.put(`/companies/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);
      navigate("/companies");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-[650px]"
      >
        <h1 className="text-3xl font-bold mb-6">
          Edit Company
        </h1>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Company Name"
          className="border w-full p-3 rounded-lg mb-4"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="border w-full p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="border w-full p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="border w-full p-3 rounded-lg mb-4"
        />
        {currentLogo && (
  <div className="mb-4">
    <p className="font-semibold mb-2">Current Logo</p>

    <img
  src={
    job.company?.logo?.startsWith("http")
      ? job.company.logo
      : "https://via.placeholder.com/70"
  }
  alt="Company Logo"
  className="w-16 h-16 rounded-xl border object-cover"
/>
  </div>
)}
        <input
          type="file"
          name="logo"
          onChange={handleChange}
          className="border w-full p-3 rounded-lg mb-5"
        />

        <button
          className="bg-blue-600 text-white w-full py-3 rounded-lg"
        >
          Update Company
        </button>
      </form>
    </div>
  );
}

export default EditCompany;