import {
  FaSearch,
  FaUserTie,
  FaBuilding,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaSearch size={38} />,
      title: "Easy Job Search",
      desc: "Search thousands of verified jobs with powerful filters and find your dream job within minutes.",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: <FaUserTie size={38} />,
      title: "Top Recruiters",
      desc: "Connect with India's leading recruiters and get hired by top companies faster.",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      icon: <FaBuilding size={38} />,
      title: "Trusted Companies",
      desc: "Explore opportunities from trusted companies actively hiring talented candidates.",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Why Choose JobPortal?
          </h2>

          <p className="text-gray-500 mt-3 text-lg">
            Everything you need to land your dream job.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 text-center"
            >
              <div
                className={`${item.bg} ${item.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}
              >
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;