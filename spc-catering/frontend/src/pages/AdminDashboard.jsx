// frontend/src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { Calendar, Clock, TrendingUp, Package, Users, ArrowRight, Activity } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/admin/stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Admin Dashboard</h1>
          <p className="text-lg text-gray-600">Manage your catering business operations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Calendar className="w-7 h-7" />}
            title="Total Bookings"
            value={stats?.totalBookings || 0}
            gradient="from-blue-500 to-blue-600"
            bgGradient="from-blue-50 to-blue-100"
          />
          <StatCard
            icon={<Clock className="w-7 h-7" />}
            title="Upcoming Events"
            value={stats?.upcomingBookings || 0}
            gradient="from-indigo-500 to-indigo-600"
            bgGradient="from-indigo-50 to-indigo-100"
          />
          <StatCard
            icon={<Users className="w-7 h-7" />}
            title="Pending Approvals"
            value={stats?.pendingBookings || 0}
            gradient="from-purple-500 to-purple-600"
            bgGradient="from-purple-50 to-purple-100"
            highlight={stats?.pendingBookings > 0}
          />
          <StatCard
            icon={<TrendingUp className="w-7 h-7" />}
            title="Est. Revenue"
            value={`₹${stats?.totalEstimated?.toLocaleString() || 0}`}
            gradient="from-green-500 to-emerald-600"
            bgGradient="from-green-50 to-emerald-100"
            subtitle="Total estimated"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <ActionCard
            to="/admin/bookings"
            icon={<Calendar className="w-8 h-8" />}
            title="Manage Bookings"
            description="View all client bookings, update statuses, and download proposals"
            gradient="from-blue-600 to-indigo-600"
            stats={stats?.pendingBookings > 0 ? `${stats.pendingBookings} pending` : null}
          />

          <ActionCard
            to="/admin/menu"
            icon={<Package className="w-8 h-8" />}
            title="Manage Menu"
            description="Add, edit, or remove dishes from your catering catalog"
            gradient="from-purple-600 to-pink-600"
          />
        </div>

        {/* Business Insights */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Business Insights</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <InsightCard
              label="Average Booking Value"
              value={`₹${Math.round((stats?.totalEstimated || 0) / (stats?.totalBookings || 1)).toLocaleString()}`}
              color="blue"
            />
            <InsightCard
              label="Conversion Rate"
              value={`${Math.round(((stats?.totalBookings - stats?.pendingBookings) / (stats?.totalBookings || 1)) * 100)}%`}
              color="green"
            />
            <InsightCard
              label="Active Bookings"
              value={stats?.upcomingBookings || 0}
              color="purple"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, subtitle, gradient, bgGradient, highlight }) => (
  <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border ${
    highlight ? 'border-purple-300 ring-2 ring-purple-100' : 'border-gray-100'
  }`}>
    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${bgGradient} mb-4`}>
      <div className={`text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>
        {icon}
      </div>
    </div>
    <div className="text-gray-600 text-sm font-medium mb-1">{title}</div>
    <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
    {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
    {highlight && (
      <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
        Requires attention
      </div>
    )}
  </div>
);

const ActionCard = ({ to, icon, title, description, gradient, stats }) => (
  <Link
    to={to}
    className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity" />
    
    {stats && (
      <span className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
        {stats}
      </span>
    )}

    <div className="relative">
      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${gradient} text-white mb-4 shadow-md group-hover:scale-110 transition-transform`}>
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>

      <p className="text-gray-600 mb-4 leading-relaxed">
        {description}
      </p>

      <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
        <span>Open</span>
        <ArrowRight className="w-5 h-5" />
      </div>
    </div>
  </Link>
);

const InsightCard = ({ label, value, color }) => {
  const colorMap = {
    blue: 'from-blue-50 to-blue-100 border-blue-200',
    green: 'from-green-50 to-emerald-100 border-green-200',
    purple: 'from-purple-50 to-pink-100 border-purple-200'
  };

  return (
    <div className={`text-center p-6 bg-gradient-to-br ${colorMap[color]} rounded-xl border`}>
      <div className="text-sm text-gray-600 mb-2 font-medium">{label}</div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
};

export default AdminDashboard;