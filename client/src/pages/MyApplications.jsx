import { useEffect, useState } from "react";
import API from "../api/axios";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications");

      console.log("USER:", user);
      console.log("APPLICATIONS:", res.data);

      const myApplications = res.data.filter(
        (application) =>
          application.applicant?._id === user?._id &&
          application.job !== null
      );

      console.log("My Applications:", myApplications);

      setApplications(myApplications);
    } catch (error) {
      console.log(error);
      alert("Failed to load applications");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <p>No Applications Yet.</p>
      ) : (
        applications.map((application) => (
          <div
            key={application._id}
            className="bg-white p-6 rounded-xl shadow-lg mb-5"
          >
            <h2 className="text-2xl font-bold">
              {application.job?.title}
            </h2>

            <p className="text-gray-600">
              {application.job?.company?.name}
            </p>

            <p className="mt-2">
              📍 {application.job?.location}
            </p>

            <p>
              💰 ₹ {Number(application.job?.salary).toLocaleString()}
            </p>

            <div className="mt-4">
              <span
                className={`px-4 py-2 rounded-full text-white ${
                  application.status === "Accepted"
                    ? "bg-green-600"
                    : application.status === "Rejected"
                    ? "bg-red-600"
                    : "bg-yellow-500"
                }`}
              >
                {application.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyApplications;