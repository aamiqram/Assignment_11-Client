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
  AreaChart,
  Area,
} from "recharts";
import {
  Users,
  Package,
  DollarSign,
  ChefHat,
  TrendingUp,
  CreditCard,
  Award,
} from "lucide-react";

const PlatformStatistics = () => {
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  const orderStatusData = [
    { name: "Pending", value: stats.pendingOrders || 0, color: "#F59E0B" },
    { name: "Accepted", value: stats.acceptedOrders || 0, color: "#3B82F6" },
    { name: "Preparing", value: stats.preparingOrders || 0, color: "#8B5CF6" },
    { name: "Delivered", value: stats.deliveredOrders || 0, color: "#10B981" },
    { name: "Cancelled", value: stats.cancelledOrders || 0, color: "#EF4444" },
  ];

  const revenueData = [
    { month: "Jan", revenue: stats.monthlyRevenue?.jan || 12000 },
    { month: "Feb", revenue: stats.monthlyRevenue?.feb || 18000 },
    { month: "Mar", revenue: stats.monthlyRevenue?.mar || 15000 },
    { month: "Apr", revenue: stats.monthlyRevenue?.apr || 22000 },
    { month: "May", revenue: stats.monthlyRevenue?.may || 19000 },
    { month: "Jun", revenue: stats.monthlyRevenue?.jun || 25000 },
  ];

  const userDistributionData = [
    {
      name: "Customers",
      value:
        stats.totalUsers - (stats.totalChefs || 0) - (stats.totalAdmins || 0),
      color: "#3B82F6",
    },
    { name: "Chefs", value: stats.totalChefs || 0, color: "#FF6B35" },
    { name: "Admins", value: stats.totalAdmins || 0, color: "#8B5CF6" },
  ];

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Loading statistics...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
            Platform Statistics
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Real-time insights and analytics dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-neutral-500">Total Users</p>
                <p className="text-3xl font-bold mt-2 text-neutral-900 dark:text-white">
                  {stats.totalUsers || 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="text-sm text-neutral-500">
              <span className="text-green-600 font-medium">↑ 12%</span> from
              last month
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-neutral-500">Total Orders</p>
                <p className="text-3xl font-bold mt-2 text-neutral-900 dark:text-white">
                  {stats.totalOrders || 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary-500" />
              </div>
            </div>
            <div className="text-sm text-neutral-500">
              <span className="text-green-600 font-medium">↑ 18%</span> from
              last month
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-neutral-500">Total Revenue</p>
                <p className="text-3xl font-bold mt-2 text-neutral-900 dark:text-white">
                  ৳{stats.totalPayment || 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="text-sm text-neutral-500">
              <span className="text-green-600 font-medium">↑ 24%</span> from
              last month
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-neutral-500">Active Chefs</p>
                <p className="text-3xl font-bold mt-2 text-neutral-900 dark:text-white">
                  {stats.totalChefs || 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-orange-500" />
              </div>
            </div>
            <div className="text-sm text-neutral-500">
              <span className="text-green-600 font-medium">↑ 8%</span> from last
              month
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Revenue Chart */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-neutral-900 dark:text-white">
              Revenue Overview
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    formatter={(value) => [`৳${value}`, "Revenue"]}
                    contentStyle={{
                      backgroundColor: "white",
                      borderColor: "#e5e7eb",
                      borderRadius: "0.75rem",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#FF6B35"
                    fill="#FF6B35"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Order Status Distribution */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-neutral-900 dark:text-white">
              Order Status Distribution
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* User Distribution & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Distribution */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-neutral-900 dark:text-white">
              User Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderColor: "#e5e7eb",
                      borderRadius: "0.75rem",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Platform Metrics */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-neutral-900 dark:text-white">
              Platform Metrics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">
                      Conversion Rate
                    </p>
                    <p className="text-sm text-neutral-500">
                      Visitor to customer
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                    4.8%
                  </p>
                  <p className="text-sm text-green-600">↑ 0.5%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">
                      Avg. Order Value
                    </p>
                    <p className="text-sm text-neutral-500">Per transaction</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                    ৳850
                  </p>
                  <p className="text-sm text-green-600">↑ ৳120</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">
                      Order Completion
                    </p>
                    <p className="text-sm text-neutral-500">
                      Successful deliveries
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                    94%
                  </p>
                  <p className="text-sm text-green-600">↑ 2%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformStatistics;
