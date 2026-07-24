import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function CTA() {
  return (
    <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 py-24 text-white">

      <div className="max-w-5xl mx-auto text-center px-6">

        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Ready to Build Your Career?
        </h2>

        <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
          Join thousands of students and recruiters who trust
          <span className="font-bold text-white"> JobPortal </span>
          to discover opportunities, hire talent, and grow their careers.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">

          <Link
            to="/jobs"
            className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-300"
          >
            Explore Jobs
            <FaArrowRight />
          </Link>

          <Link
            to="/register"
            className="border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition-all duration-300"
          >
            Create Account
          </Link>

        </div>

      </div>

    </section>
  );
}

export default CTA;