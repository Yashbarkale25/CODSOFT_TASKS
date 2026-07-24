import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";

function AddJob() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [companies, setCompanies] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    experienceLevel: "",
    jobType: "",
    position: "",
    company: "",
    createdBy: user?._id || "",
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await API.get("/companies");
      setCompanies(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load companies");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/jobs", formData);

      alert(res.data.message);

      navigate("/my-jobs");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to add job");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-[700px]"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Add New Job
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
          required
        />

        <input
          type="text"
          name="requirements"
          placeholder="Requirements"
          value={formData.requirements}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
          required
        />

        <input
          type="number"
          name="experienceLevel"
          placeholder="Experience (Years)"
          value={formData.experienceLevel}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
          required
        />

        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
          required
        >
          <option value="">Select Job Type</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>

        <input
          type="number"
          name="position"
          placeholder="Number of Positions"
          value={formData.position}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
          required
        />

        <select
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-6"
          required
        >
          <option value="">Select Company</option>

          {companies.length > 0 ? (
            companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))
          ) : (
            <option disabled>No Company Found</option>
          )}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Add Job
        </button>
      </form>
    </div>
  );
}

export default AddJob;