import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function DashboardCharts({ stats }) {
  const barData = [
    { name: "Companies", value: stats.totalCompanies },
    { name: "Jobs", value: stats.totalJobs },
    { name: "Applications", value: stats.totalApplications },
  ];

  const pieData = [
    { name: "Accepted", value: stats.accepted },
    { name: "Rejected", value: stats.rejected },
    { name: "Pending", value: stats.pending },
  ];

  const COLORS = [
    "#10B981",
    "#EF4444",
    "#F59E0B",
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-10">

      {/* Bar Chart */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Job Statistics
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" fill="#2563EB" />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Pie Chart */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Application Status
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>

            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default DashboardCharts;