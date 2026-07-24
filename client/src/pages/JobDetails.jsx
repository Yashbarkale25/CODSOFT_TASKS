import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);
      setJob(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load job");
    }
  };

  // Apply Job
  const handleApply = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (!resume) {
      alert("Please select your resume (PDF)");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("job", id);
      formData.append("applicant", user._id);
      formData.append("resume", resume);

      const res = await API.post("/applications", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Application Failed"
      );
    }
  };

  // Save Job
  const handleSaveJob = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      const res = await API.post("/saved-jobs", {
        user: user._id,
        job: id,
      });

      alert(res.data.message);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to save job"
      );
    }
  };

  if (!job) {
    return (
      <div className="text-center mt-20 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10">

        <h1 className="text-4xl font-bold">
          {job.title}
        </h1>

        <p className="text-xl text-gray-600 mt-2">
          {job.company?.name}
        </p>

        <div className="mt-8 space-y-4">

          <p>
            <strong>📍 Location:</strong> {job.location}
          </p>

          <p>
            <strong>💼 Job Type:</strong> {job.jobType}
          </p>

          <p>
            <strong>🎓 Experience:</strong> {job.experienceLevel} Year
          </p>

          <p>
            <strong>💰 Salary:</strong> ₹{" "}
            {Number(job.salary).toLocaleString()}
          </p>

          <p>
            <strong>📋 Requirements:</strong> {job.requirements}
          </p>

          <div>
            <strong>📝 Description:</strong>

            <p className="text-gray-700 mt-2">
              {job.description}
            </p>
          </div>

          {user?.role === "student" && (
            <>
              <div className="mt-6">
                <label className="font-semibold">
                  Upload Resume (PDF)
                </label>

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="mt-2 block w-full border p-3 rounded-lg"
                />
              </div>

              <div className="flex gap-4 mt-8">

                <button
                  onClick={handleApply}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
                >
                  Apply Now
                </button>

                <button
                  onClick={handleSaveJob}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg"
                >
                  ⭐ Save Job
                </button>

              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default JobDetails;