import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../api/axios";

function TopCompanies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await API.get("/companies");
      setCompanies(res.data.slice(0, 6));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Top Companies
          </h2>

          <p className="text-gray-500 mt-3">
            Trusted companies hiring talented people.
          </p>
        </div>

        {companies.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No Companies Available
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

            {companies.map((company) => (
              <motion.div
                key={company._id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-white border rounded-2xl shadow-lg hover:shadow-2xl p-6 flex flex-col items-center"
              >
                <img
                  src={
  company.logo
    ? company.logo
    : "https://via.placeholder.com/80"
}
                  alt={company.name}
                  className="w-20 h-20 object-cover rounded-xl border"
                />

                <h3 className="mt-4 text-lg font-bold text-center">
                  {company.name}
                </h3>

                <p className="text-gray-500 text-sm mt-1 text-center">
                  {company.location}
                </p>

                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 text-sm mt-3 hover:underline"
                  >
                    Visit Website
                  </a>
                )}
              </motion.div>
            ))}

          </div>
        )}
      </div>
    </section>
  );
}

export default TopCompanies;