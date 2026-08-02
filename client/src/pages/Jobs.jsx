import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link, useLocation } from "react-router-dom";

import {
  FaSearch,
  FaFilter,
  FaHeart,
} from "react-icons/fa";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("search") || "";

  const [search, setSearch] = useState(searchQuery);
  const [jobType, setJobType] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
const jobsPerPage = 6;

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load jobs");
    }
  };

  const saveJob = async (jobId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        return;
      }

      const res = await API.post("/saved-jobs", {
        user: user._id,
        job: jobId,
      });

      alert(res.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to save job"
      );
    }
  };

  // Filters
  const filteredJobs = jobs.filter((job) => {

    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.name?.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      jobType === "" || job.jobType === jobType;

    const matchesLocation =
      locationFilter === "" ||
      job.location
        .toLowerCase()
        .includes(locationFilter.toLowerCase());

    const matchesExperience =
      experience === "" ||
      Number(job.experienceLevel) >= Number(experience);

    const matchesSalary =
      salary === "" ||
      Number(job.salary) >= Number(salary);

    return (
      matchesSearch &&
      matchesType &&
      matchesLocation &&
      matchesExperience &&
      matchesSalary
    );
  });
  const indexOfLastJob = currentPage * jobsPerPage;
const indexOfFirstJob = indexOfLastJob - jobsPerPage;

const currentJobs = filteredJobs.slice(
  indexOfFirstJob,
  indexOfLastJob
);

const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);


  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <h1 className="text-4xl font-bold mb-8">
          Find Your Dream Job
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Left Sidebar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">

            <div className="flex items-center gap-2 mb-6">
              <FaFilter className="text-blue-600" />
              <h2 className="font-bold text-xl">
                Filters
              </h2>
            </div>
                        <input
              placeholder="Search Job"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border w-full p-3 rounded-xl mb-4"
            />

            <input
              placeholder="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border w-full p-3 rounded-xl mb-4"
            />

            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="border w-full p-3 rounded-xl mb-4"
            >
              <option value="">All Types</option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>

            <input
              type="number"
              placeholder="Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="border w-full p-3 rounded-xl mb-4"
            />

            <input
              type="number"
              placeholder="Minimum Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="border w-full p-3 rounded-xl"
            />

          </div>

          {/* Right Side */}
          <div className="lg:col-span-3">

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-5 mb-6 flex items-center gap-3">

              <FaSearch className="text-blue-600" />

              <input
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 outline-none"
              />

            </div>

            {filteredJobs.length > 0 ? (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {currentJobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
                  >

                    <div className="p-6">

                      {/* Company */}
                      <div className="flex justify-between">

                        <div className="flex gap-4">

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

                            <h2 className="text-xl font-bold">
                              {job.title}
                            </h2>

                            <p className="text-gray-500">
                              {job.company?.name}
                            </p>

                          </div>

                        </div>

                        <button
                          onClick={() => saveJob(job._id)}
                          className="text-red-500 hover:text-red-600 text-2xl"
                        >
                          <FaHeart />
                        </button>

                      </div>

                      {/* Badges */}
                      <div className="flex gap-3 mt-6 flex-wrap">

                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {job.jobType}
                        </span>

                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          ₹ {Number(job.salary).toLocaleString()}
                        </span>

                      </div>

                      {/* Details */}
                      <div className="space-y-3 mt-6">

                        <p>📍 {job.location}</p>

                        <p>
                          💼 {job.experienceLevel} Year Experience
                        </p>

                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mt-6 line-clamp-3">
                        {job.description}
                      </p>

                      {/* Buttons */}
                      <div className="flex gap-3 mt-6">

                        <Link
                          to={`/jobs/${job._id}`}
                          className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700"
                        >
                          View Details
                        </Link>

                        <button
                          onClick={() => saveJob(job._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg"
                        >
                          Save
                        </button>

                      </div>

                    </div>

                  </div>

                ))}
                <div className="flex justify-center items-center gap-4 mt-10">

  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-5 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
  >
    ← Previous
  </button>

  <span className="font-semibold text-lg">
    Page {currentPage} of {totalPages}
  </span>

  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="px-5 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
  >
    Next →
  </button>

</div>
              </div>

            ) : (              <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

                <img
                  src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                  alt="No Jobs"
                  className="w-40 mx-auto mb-6"
                />

                <h2 className="text-3xl font-bold text-gray-700">
                  No Jobs Found
                </h2>

                <p className="text-gray-500 mt-3">
                  Try changing your search or filter options.
                </p>

              </div>

            )}
            
          </div>

        </div>

      </div>

    </div>
  );
}

export default Jobs;