import { FaStar } from "react-icons/fa";

function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      role: "Software Engineer",
      company: "Google",
      text: "This portal helped me land my dream job. The application process was smooth, simple and professional.",
    },
    {
      name: "Priya Patel",
      role: "Frontend Developer",
      company: "Microsoft",
      text: "I found internships within days. The interface is beautiful and extremely easy to use.",
    },
    {
      name: "Amit Verma",
      role: "MERN Stack Developer",
      company: "Amazon",
      text: "One of the best job portals I've used. I received multiple interview calls after applying here.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Success Stories
          </h2>

          <p className="text-gray-500 mt-3 text-lg">
            Hear from candidates who found their dream careers through JobPortal.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">

          {reviews.map((review, index) => (

            <div
              key={index}
              className="bg-gray-50 rounded-3xl border shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8"
            >

              <div className="flex mb-5 text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="text-gray-600 italic leading-7">
                "{review.text}"
              </p>

              <div className="flex items-center mt-8">

                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                  {review.name.charAt(0)}
                </div>

                <div className="ml-4">

                  <h3 className="font-bold text-lg text-gray-800">
                    {review.name}
                  </h3>

                  <p className="text-blue-600 text-sm">
                    {review.role}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {review.company}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;