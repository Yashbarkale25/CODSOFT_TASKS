import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function UpdateProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    profilePhoto: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get(`/profile/${user._id}`);

      setFormData({
        bio: res.data.bio || "",
        skills: res.data.skills
          ? res.data.skills.join(", ")
          : "",
        profilePhoto: res.data.profilePhoto || "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put("/profile", {
        user: user._id,
        bio: formData.bio,
        skills: formData.skills
          .split(",")
          .map((item) => item.trim()),
        profilePhoto: formData.profilePhoto,
      });

      alert("Profile Updated Successfully");

      navigate("/profile");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-[600px]"
      >

        <h1 className="text-3xl font-bold mb-8">
          Edit Profile
        </h1>

        <label className="font-semibold">
          Profile Photo URL
        </label>

        <input
          type="text"
          name="profilePhoto"
          placeholder="https://example.com/photo.jpg"
          value={formData.profilePhoto}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mt-2 mb-5"
        />

        <label className="font-semibold">
          Bio
        </label>

        <textarea
          rows="4"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mt-2 mb-5"
        />

        <label className="font-semibold">
          Skills
        </label>

        <input
          type="text"
          name="skills"
          placeholder="React, Node.js, MongoDB"
          value={formData.skills}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mt-2 mb-8"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
}

export default UpdateProfile;