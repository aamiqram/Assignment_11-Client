import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../utils/axiosSecure";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const PlatformStatistics = () => {
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  const orderStatusData = [
    { name: "Pending", value: stats.pendingOrders || 0 },
    { name: "Delivered", value: stats.deliveredOrders || 0 },
  ];

  const COLORS = ["#FF8042", "#00C49F"];

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-10">Platform Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{stats.totalUsers || 0}</div>
        </div>
        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-title">Total Orders</div>
          <div className="stat-value text-secondary">
            {stats.totalOrders || 0}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-title">Pending Orders</div>
          <div className="stat-value text-warning">
            {stats.pendingOrders || 0}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value text-success">
            ৳{stats.totalPayment || 0}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Pie Chart - Order Status */}
        <div className="card bg-base-100 shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Order Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {orderStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Revenue Overview (Placeholder - you can expand later) */}
        <div className="card bg-base-100 shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Revenue Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: "Total Revenue", amount: stats.totalPayment || 0 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PlatformStatistics;
