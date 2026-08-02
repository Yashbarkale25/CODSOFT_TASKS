import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

function Company() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await API.get("/companies");
      setCompanies(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load companies");
    }
  };

  const deleteCompany = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmDelete) return;

    try {
      const res = await API.delete(`/companies/${id}`);

      alert(res.data.message);

      fetchCompanies();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        🏢 Companies
      </h1>

      {companies.length === 0 ? (
        <h2 className="text-center text-2xl">
          No Companies Found
        </h2>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {companies.map((company) => (

            <div
              key={company._id}
              className="bg-white rounded-2xl shadow-xl p-6"
            >

              <div className="flex justify-center">

                <img
  src={
    company.logo?.startsWith("http")
      ? company.logo
      : "https://via.placeholder.com/80"
  }
  alt={company.name}
  className="w-16 h-16 rounded-xl border object-cover"
/>
              </div>

              <h2 className="text-2xl font-bold text-center mt-5">
                {company.name}
              </h2>

              <p className="mt-4">
                <strong>Description:</strong>
                <br />
                {company.description}
              </p>

              <p className="mt-3">
                <strong>Location:</strong>
                <br />
                {company.location}
              </p>

              <p className="mt-3">
                <strong>Website:</strong>
                <br />

                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {company.website}
                </a>
              </p>

              <div className="flex gap-3 mt-8">

                <Link
                  to={`/edit-company/${company._id}`}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-center"
                >
                  ✏ Edit
                </Link>

                <button
                  onClick={() => deleteCompany(company._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Company;