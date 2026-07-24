import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function ViewApplicants() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const res = await API.get(`/applications/job/${jobId}`);
      setApplications(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load applicants");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await API.put(`/applications/${id}/status`, {
        status,
      });

      alert(res.data.message);

      fetchApplicants();
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        Job Applicants
      </h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Resume</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>

          </thead>

          <tbody>

            {applications.length > 0 ? (

              applications.map((app) => (

                <tr
                  key={app._id}
                  className="border-b"
                >
                  <td className="p-4">
                    {app.applicant?.fullName}
                  </td>

                  <td className="p-4">
                    {app.applicant?.email}
                  </td>

                  <td className="p-4">
                    <a
                      href={`http://localhost:5000${app.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600"
                    >
                      View Resume
                    </a>
                  </td>

                  <td className="p-4">
                    {app.status}
                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() =>
                        updateStatus(app._id, "Accepted")
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(app._id, "Rejected")
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Reject
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="5"
                  className="text-center p-8"
                >
                  No Applicants Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ViewApplicants;