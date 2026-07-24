import { FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300">

      <div className="flex items-center gap-4">
        <img
          src={
            job.company?.logo ||
            "https://via.placeholder.com/60"
          }
          alt="Company Logo"
          className="rounded-xl w-16 h-16 object-cover"
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

      <div className="flex gap-6 mt-5 text-gray-600">
        <span className="flex items-center gap-2">
          <FaMapMarkerAlt />
          {job.location}
        </span>

        <span className="flex items-center gap-2">
          <FaBriefcase />
          {job.jobType}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-gray-700">
          {job.description}
        </p>
      </div>

      <div className="mt-5 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-600">
          ₹ {Number(job.salary).toLocaleString()}
        </h2>

        <Link
          to={`/jobs/${job._id}`}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>

    </div>
  );
}

export default JobCard;