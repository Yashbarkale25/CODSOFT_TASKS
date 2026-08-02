import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaFilePdf,
  FaEdit,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);
const fetchProfile = async () => {
  try {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const res = await API.get(`/profile/${currentUser._id}`);

    setUser(res.data);

  } catch (err) {
    console.log(err);
    alert("Failed to load profile");
  }
};
const uploadResume = async () => {
  try {
    if (!resume) {
      alert("Please select a PDF file");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("user", currentUser._id);

    const res = await API.post(
      "/profile/upload-resume",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert(res.data.message);

    fetchProfile();
  } catch (error) {
    console.log(error);
    alert("Resume upload failed");
  }
};

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Cover */}

        <div className="h-52 bg-gradient-to-r from-blue-700 to-indigo-700"></div>

        {/* Profile */}

        <div className="px-10 pb-10">

          <div className="-mt-20 flex justify-between items-end">

            <div className="flex items-end gap-6">

              {user.profilePhoto ? (
  <img
    src={user.profilePhoto}
    alt="Profile"
    className="w-36 h-36 rounded-full border-4 border-white object-cover"
  />
) : (
  <FaUserCircle
    size={140}
    className="text-gray-400 bg-white rounded-full"
  />
)}

              <div>

                <h1 className="text-4xl font-bold">
                  {user.user?.fullName}
                </h1>

                <p className="text-gray-500 mt-2">
                  {user.user?.role}
                </p>

              </div>

            </div>

            <Link
            to="/update-profile"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            Edit Profile
          </Link>
          </div>

          {/* Contact */}

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div className="bg-gray-50 rounded-xl p-6">

              <h2 className="text-xl font-bold mb-5">
                Contact Information
              </h2>

              <p className="flex items-center gap-3 mb-3">
                <FaEnvelope className="text-blue-600" />
                {user.user?.email}
              </p>

              <p className="flex items-center gap-3">
                <FaPhone className="text-green-600" />
               {user.user?.phoneNumber}
              </p>

            </div>

            <div className="bg-gray-50 rounded-xl p-6">

              <h2 className="text-xl font-bold mb-5">
                Resume
              </h2>

                     {user.resume ? (
  <a
    href={user.resume}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-3 text-red-600 mb-4"
  >
    <FaFilePdf size={28} />
    View Resume
  </a>
) : (
  <p className="mb-4">No Resume Uploaded</p>
)}

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="mb-4"
            />

            <button
              onClick={uploadResume}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Upload Resume
            </button>
            </div>

          </div>

          {/* Bio */}

          <div className="bg-gray-50 rounded-xl p-6 mt-8">

            <h2 className="text-xl font-bold mb-4">
              Bio
            </h2>

            <p className="text-gray-600">
             {user.bio || "No bio added."}
            </p>

          </div>

          {/* Skills */}

          <div className="bg-gray-50 rounded-xl p-6 mt-8">

            <h2 className="text-xl font-bold mb-5">
              Skills
            </h2>

            <div className="flex flex-wrap gap-3">

              {user.skills?.length > 0 ? (
                user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p>No Skills Added</p>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;