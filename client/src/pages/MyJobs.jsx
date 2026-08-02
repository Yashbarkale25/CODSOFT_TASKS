import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";


function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");

      console.log("========== DEBUG ==========");
      console.log("Logged In User:", user);
      console.log("All Jobs:", res.data);

      const recruiterJobs = res.data.filter((job) => {
        console.log(
          "Job:",
          job.title,
          "| Created By:",
          job.createdBy?._id,
          "| Logged User:",
          user?._id
        );

        return job.createdBy?._id === user?._id;
      });

      console.log("Recruiter Jobs:", recruiterJobs);

      setJobs(recruiterJobs);
    } catch (error) {
      console.log(error);
      alert("Failed to load jobs");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      const res = await API.delete(`/jobs/${id}`);
      alert(res.data.message);
      fetchJobs();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Posted Jobs</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

  <input
    type="text"
    placeholder="Search Job..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded-lg px-4 py-3 w-full md:w-96"
  />

  <div className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold">
    Total Jobs : {jobs.length}
  </div>

</div>

        <Link
          to="/add-job"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          + Add Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h2 className="text-2xl">No Jobs Posted</h2>
        </div>
      ) : (
       jobs
  .filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  )
  .map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-xl shadow-lg p-6 mb-6"
          >
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <div className="flex items-center gap-4 mb-4">

 <img
  src={
    job.company?.logo?.startsWith("http")
      ? job.company.logo
      : "https://via.placeholder.com/70"
  }
  alt="Company Logo"
  className="w-16 h-16 rounded-xl border object-cover"
/>
  <div>

    

  </div>

</div>
            <p className="text-gray-600">{job.company?.name}</p>

            <p className="mt-2">📍 {job.location}</p>

            <p>💼 {job.jobType}</p>

            <p>💰 ₹ {Number(job.salary).toLocaleString()}</p>

            <div className="mt-4">

  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">

    👥 {job.applicantCount || 0} Applicants

  </span>

</div>

            <div className="flex gap-3 mt-5">
              <Link
                to={`/edit-job/${job._id}`}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(job._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>

              
              <Link
              to={`/view-applicants/${job._id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              View Applicants
            </Link>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyJobs;