// frontend/src/pages/AdminBookingsPage.jsx
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Calendar, Users, Download, Filter } from "lucide-react";

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchBookings = () => {
    axiosClient
      .get("/bookings")
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = (id, status) => {
    axiosClient
      .patch(`/bookings/${id}/status`, { status })
      .then(fetchBookings)
      .catch(() => alert("Failed to update status"));
  };

  const downloadProposal = (id) => {
    window.open(`http://localhost:5000/api/bookings/${id}/proposal`, "_blank");
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">All Bookings</h1>
          <p className="text-lg text-gray-600">View and manage client bookings</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-100">
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-5 h-5 text-gray-600" />
            <FilterButton 
              active={filter === 'all'} 
              onClick={() => setFilter('all')}
              label="All"
              count={bookings.length}
            />
            <FilterButton 
              active={filter === 'pending'} 
              onClick={() => setFilter('pending')}
              label="Pending"
              count={bookings.filter(b => b.status === 'pending').length}
              color="yellow"
            />
            <FilterButton 
              active={filter === 'confirmed'} 
              onClick={() => setFilter('confirmed')}
              label="Confirmed"
              count={bookings.filter(b => b.status === 'confirmed').length}
              color="green"
            />
            <FilterButton 
              active={filter === 'completed'} 
              onClick={() => setFilter('completed')}
              label="Completed"
              count={bookings.filter(b => b.status === 'completed').length}
              color="blue"
            />
            <FilterButton 
              active={filter === 'cancelled'} 
              onClick={() => setFilter('cancelled')}
              label="Cancelled"
              count={bookings.filter(b => b.status === 'cancelled').length}
              color="red"
            />
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Guests
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium">
                        {filter === 'all' ? 'No bookings found' : `No ${filter} bookings`}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                            {(b.user?.name || "U")[0].toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-semibold text-gray-900">
                              {b.user?.name || "Unknown"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {b.user?.email || ""}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">{b.eventType}</div>
                        <div className="text-xs text-gray-500">{b.venue}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(b.eventDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <Users className="w-4 h-4 text-gray-500" />
                          {b.guests}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-blue-600">
                          ₹{b.estimatedBudget?.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b._id, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 focus:outline-none focus:ring-2 transition-all ${getStatusStyle(b.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => downloadProposal(b._id)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Proposal
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        {bookings.length > 0 && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <SummaryCard 
              label="Total Bookings" 
              value={bookings.length}
              color="blue"
            />
            <SummaryCard 
              label="Pending" 
              value={bookings.filter(b => b.status === 'pending').length}
              color="yellow"
            />
            <SummaryCard 
              label="Confirmed" 
              value={bookings.filter(b => b.status === 'confirmed').length}
              color="green"
            />
            <SummaryCard 
              label="Completed" 
              value={bookings.filter(b => b.status === 'completed').length}
              color="purple"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const getStatusStyle = (status) => {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300 focus:ring-yellow-500',
    confirmed: 'bg-green-100 text-green-800 border-green-300 focus:ring-green-500',
    completed: 'bg-blue-100 text-blue-800 border-blue-300 focus:ring-blue-500',
    cancelled: 'bg-red-100 text-red-800 border-red-300 focus:ring-red-500'
  };
  return styles[status] || styles.pending;
};

const FilterButton = ({ active, onClick, label, count, color = 'blue' }) => {
  const colorMap = {
    blue: 'from-blue-600 to-indigo-600',
    green: 'from-green-600 to-emerald-600',
    yellow: 'from-yellow-600 to-orange-600',
    red: 'from-red-600 to-pink-600'
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
        active 
          ? `bg-gradient-to-r ${colorMap[color]} text-white shadow-md` 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label} <span className={active ? 'text-white' : 'text-gray-500'}>({count})</span>
    </button>
  );
};

const SummaryCard = ({ label, value, color }) => {
  const colorMap = {
    blue: 'from-blue-50 to-blue-100',
    yellow: 'from-yellow-50 to-yellow-100',
    green: 'from-green-50 to-green-100',
    purple: 'from-purple-50 to-purple-100'
  };

  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} rounded-xl p-4 border border-${color}-200`}>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
};

export default AdminBookingsPage;