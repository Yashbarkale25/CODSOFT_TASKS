import { useEffect, useState } from "react";
import API from "../api/axios";
import JobCardSkeleton from "../components/JobCardSkeleton";

import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";

function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
  try {
    const res = await API.get("/jobs");
    setJobs(res.data.slice(0, 6));
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-800">
              Featured Jobs
            </h2>

            <p className="text-gray-500 mt-2">
              Discover the latest opportunities from top companies.
            </p>
          </div>

          <Link
            to="/jobs"
            className="mt-5 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            View All Jobs →
          </Link>
        </div>
{/* Loading */}
{loading ? (
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {[...Array(6)].map((_, index) => (
      <JobCardSkeleton key={index} />
    ))}
  </div>
) : jobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-700">
              No Jobs Available
            </h2>

            <p className="text-gray-500 mt-3">
              Recruiters haven't posted any jobs yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {jobs.map((job) => (

              <div
                key={job._id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border"
              >

                <div className="p-7">

                  {/* Company */}
                  <div className="flex items-center gap-4">

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
                      <h3 className="text-xl font-bold text-gray-800">
                        {job.title}
                      </h3>

                      <p className="text-gray-500">
                        {job.company?.name}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-7 space-y-4">

                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-blue-600" />
                      <span>{job.location}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaBriefcase className="text-green-600" />
                      <span>{job.jobType}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaClock className="text-orange-500" />
                      <span>{job.experienceLevel} Years Experience</span>
                    </div>

                    <div className="flex items-center gap-3 text-green-700 font-bold text-lg">
                      <FaMoneyBillWave />
                      ₹ {Number(job.salary).toLocaleString()}
                    </div>

                  </div>

                  {/* Buttons */}
                  <div className="mt-8 flex gap-3">

                    <Link
                      to={`/jobs/${job._id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-semibold transition"
                    >
                      View Details
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default FeaturedJobs;