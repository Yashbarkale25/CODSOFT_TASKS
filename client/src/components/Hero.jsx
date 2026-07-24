import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import hero from "../assets/hero.png";

function Hero() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-8 py-20 grid lg:grid-cols-2 items-center gap-10">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        ><h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
  Find Your <span className="text-yellow-300">Dream Job</span>
</h1>

         <p className="text-lg md:text-xl mt-6 text-blue-100 max-w-xl leading-8">
  Discover thousands of verified job opportunities from top companies and start your career with confidence.
</p>

          <div className="bg-white rounded-2xl mt-10 p-2 flex flex-col md:flex-row shadow-2xl">
            <div className="mt-8 flex gap-4">
  <button
    onClick={() => navigate("/jobs")}
    className="bg-yellow-500 hover:bg-black-500 text-black font-semibold px-8 py-3 rounded-xl"
  >
    Browse Jobs
  </button>

  <button
    onClick={() => navigate("/register")}
    className="border-2 border-white hover:bg-white hover:text-blue-700 transition px-8 py-3 rounded-xl"
  >
    Get Started
  </button>
</div>

            <input
              className="flex-1 p-4 outline-none text-black"
              placeholder="Search jobs..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />

            <input
              className="flex-1 p-4 outline-none text-black border-l"
              placeholder="Location"
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
            />

            <button
              onClick={() =>
                navigate(`/jobs?search=${search}`)
              }
              className="bg-blue-600 hover:bg-blue-700 px-8 rounded-xl"
            >
              Search
            </button>
            <div className="flex gap-10 mt-10">
  <div>
    <h2 className="text-3xl font-bold">5000+</h2>
    <p className="text-blue-200">Jobs</p>
  </div>

  <div>
    <h2 className="text-3xl font-bold">500+</h2>
    <p className="text-blue-200">Companies</p>
  </div>

  <div>
    <h2 className="text-3xl font-bold">10K+</h2>
    <p className="text-blue-200">Candidates</p>
  </div>
</div>

          </div>

        </motion.div>

        <motion.div
          initial={{ opacity:0,x:60 }}
          animate={{ opacity:1,x:0 }}
        >
          <img
  src={hero}
  alt="Hero"
  className="w-full drop-shadow-2xl hover:scale-105 transition duration-500"
/>
        </motion.div>

      </div>

    </section>
  );
}

export default Hero;