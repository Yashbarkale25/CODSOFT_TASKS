import { useEffect, useState } from "react";
import API from "../api/axios";
import DashboardCharts from "../components/DashboardCharts";
import {
  FaBriefcase,
  FaBuilding,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalJobs: 0,
    totalApplications: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
    recentApplications: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get(`/dashboard/${user._id}`);

      setStats(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load dashboard");
    }
  };

  const cards = [
    {
      title: "Companies",
      value: stats.totalCompanies,
      icon: <FaBuilding size={35} />,
      color: "bg-blue-500",
    },
    {
      title: "Jobs Posted",
      value: stats.totalJobs,
      icon: <FaBriefcase size={35} />,
      color: "bg-green-500",
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      icon: <FaUsers size={35} />,
      color: "bg-purple-500",
    },
    {
      title: "Accepted",
      value: stats.accepted,
      icon: <FaCheckCircle size={35} />,
      color: "bg-emerald-500",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <FaTimesCircle size={35} />,
      color: "bg-red-500",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FaClock size={35} />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">

      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        Recruiter Dashboard
      </h1>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {cards.map((card, index) => (

          <div
            key={index}
            className={`${card.color} text-white rounded-2xl p-6 shadow-xl hover:scale-105 transition`}
          >

            <div className="flex justify-between items-center gap-4">

              <div>

                <p className="text-lg">
                  {card.title}
                </p>

                <h2 className="text-3xl md:text-4xl font-bold mt-2">
                  {card.value}
                </h2>

              </div>

              {card.icon}

            </div>

          </div>

        ))}

      </div>

      {/* Charts */}

      <div className="mt-10">
        <DashboardCharts stats={stats} />
      </div>

      {/* Recent Applications */}

      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mt-10">

        <h2 className="text-2xl font-bold mb-6">
          Recent Applications
        </h2>

        {stats.recentApplications.length === 0 ? (

          <p className="text-gray-500">
            No Applications Yet
          </p>

        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead>

                <tr className="bg-blue-600 text-white">

                  <th className="p-3 text-left">
                    Applicant
                  </th>

                  <th className="p-3 text-left">
                    Job
                  </th>

                  <th className="p-3 text-left">
                    Status
                  </th>

                  <th className="p-3 text-left">
                    Resume
                  </th>

                </tr>

              </thead>

              <tbody>

                {stats.recentApplications.map((app) => (

                  <tr
                    key={app._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">

                      <div className="font-semibold">
                        {app.applicant?.fullName}
                      </div>

                      <div className="text-gray-500 text-sm">
                        {app.applicant?.email}
                      </div>

                    </td>

                    <td className="p-3">
                      {app.job?.title}
                    </td>

                    <td className="p-3">

                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          app.status === "Accepted"
                            ? "bg-green-500"
                            : app.status === "Rejected"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {app.status}
                      </span>

                    </td>

                    <td className="p-3">

                      {app.resume ? (

                        <a
                          href={`http://localhost:5000${app.resume}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          View Resume
                        </a>

                      ) : (

                        "No Resume"

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;