import {
  FaBriefcase,
  FaBuilding,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

function Stats() {
  const cards = [
    {
      title: "Active Jobs",
      value: "500+",
      icon: <FaBriefcase size={34} />,
      color: "text-blue-600",
    },
    {
      title: "Companies",
      value: "100+",
      icon: <FaBuilding size={34} />,
      color: "text-green-600",
    },
    {
      title: "Students",
      value: "1000+",
      icon: <FaUsers size={34} />,
      color: "text-purple-600",
    },
    {
      title: "Success Rate",
      value: "98%",
      icon: <FaChartLine size={34} />,
      color: "text-red-500",
    },
  ];

  return (
    <section className="-mt-14 relative z-20 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 flex items-center gap-5"
            >
              <div
                className={`${item.color} bg-gray-100 p-5 rounded-2xl`}
              >
                {item.icon}
              </div>

              <div>
                <h2 className="text-4xl font-extrabold text-gray-900">
                  {item.value}
                </h2>

                <p className="text-gray-500 text-lg mt-1">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;