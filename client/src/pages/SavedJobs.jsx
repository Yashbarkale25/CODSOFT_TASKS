import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get(`/saved-jobs/${user._id}`);

      setSavedJobs(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load saved jobs");
    }
  };

  const removeJob = async (id) => {
    try {
      await API.delete(`/saved-jobs/${id}`);

      setSavedJobs(savedJobs.filter((job) => job._id !== id));
    } catch (err) {
      console.log(err);
      alert("Failed to remove job");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Saved Jobs
        </h1>

        {savedJobs.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl text-center shadow">
            <h2 className="text-2xl font-bold">
              No Saved Jobs
            </h2>

            <p className="text-gray-500 mt-3">
              Save jobs to view them later.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {savedJobs.map((item) => (

              <div
                key={item._id}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <h2 className="text-2xl font-bold">
                  {item.job?.title}
                </h2>

                <p className="text-gray-500">
                  {item.job?.company?.name}
                </p>

                <p className="mt-3">
                  📍 {item.job?.location}
                </p>

                <p className="mt-2">
                  💰 ₹ {Number(item.job?.salary).toLocaleString()}
                </p>

                <div className="flex gap-3 mt-6">

                  <Link
                    to={`/jobs/${item.job?._id}`}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => removeJob(item._id)}
                    className="bg-red-500 text-white px-5 py-2 rounded-lg"
                  >
                    Remove
                  </button>

                </div>
              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default SavedJobs;