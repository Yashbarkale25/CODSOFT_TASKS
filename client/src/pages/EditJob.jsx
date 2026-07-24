import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

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
  });

  useEffect(() => {
    fetchJob();
    fetchCompanies();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);

      setFormData({
        title: res.data.title || "",
        description: res.data.description || "",
        requirements: res.data.requirements || "",
        salary: res.data.salary || "",
        location: res.data.location || "",
        experienceLevel: res.data.experienceLevel || "",
        jobType: res.data.jobType || "",
        position: res.data.position || "",
        company: res.data.company?._id || "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to load job");
    }
  };

  const fetchCompanies = async () => {
    try {
      const res = await API.get("/company");
      setCompanies(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateJob = async (e) => {
    e.preventDefault();

    try {
      const res = await API.put(`/jobs/${id}`, formData);

      alert(res.data.message);

      navigate("/my-jobs");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[700px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Edit Job
        </h1>

        <form onSubmit={updateJob}>

          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            name="requirements"
            placeholder="Requirements"
            value={formData.requirements}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="number"
            name="experienceLevel"
            placeholder="Experience"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          >
            <option value="">Select Job Type</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Internship</option>
            <option>Remote</option>
          </select>

          <input
            type="number"
            name="position"
            placeholder="Open Positions"
            value={formData.position}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <select
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-6"
          >
            <option value="">Select Company</option>

            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Update Job
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditJob;