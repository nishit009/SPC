// frontend/src/pages/NewBookingPage.jsx
import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { Calendar, Users, MapPin, Sparkles, Plus, X, CheckCircle2, Loader2, DollarSign, Info } from "lucide-react";

const NewBookingPage = () => {
  const [form, setForm] = useState({
    eventType: "",
    eventDate: "",
    venue: "",
    guests: 50,
    preferences: "",
    dietaryRestrictions: ""
  });

  const [recommended, setRecommended] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    axiosClient.get("/menu").then(res => setMenuItems(res.data));
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const generateMenu = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.post("/ai/recommend", form);
      setRecommended({
        ...data,
        items: [...data.items]
      });
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const addItem = (item) => {
    if (!recommended.items.includes(item.name)) {
      setRecommended({
        ...recommended,
        items: [...recommended.items, item.name]
      });
    }
  };

  const removeItem = (item) => {
    setRecommended({
      ...recommended,
      items: recommended.items.filter(i => i !== item)
    });
  };

  const submitBooking = async () => {
    try {
      await axiosClient.post("/bookings", {
        ...form,
        recommendedMenu: recommended
      });
      alert("🎉 Booking Submitted Successfully!");
      window.location.href = "/bookings";
    } catch (error) {
      alert("Failed to submit booking. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">AI-Powered Planning</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Plan Your Perfect Event
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let our AI create a customized menu tailored to your preferences
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-4">
            <StepIndicator number={1} label="Event Details" active={step === 1} completed={step > 1} />
            <div className={`w-16 h-0.5 ${step > 1 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <StepIndicator number={2} label="Review Menu" active={step === 2} completed={false} />
          </div>
        </div>

        {/* Step 1: Event Details Form */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">Tell Us About Your Event</h2>
              <p className="text-blue-100 mt-1">Share the details and we'll handle the rest</p>
            </div>
            
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Event Type */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Info className="w-4 h-4" />
                    Event Type
                  </label>
                  <input
                    name="eventType"
                    placeholder="Wedding, Corporate Event, Birthday Party..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={form.eventType}
                    onChange={onChange}
                    required
                  />
                </div>

                {/* Event Date */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4" />
                    Event Date
                  </label>
                  <input
                    name="eventDate"
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={form.eventDate}
                    onChange={onChange}
                    required
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Users className="w-4 h-4" />
                    Number of Guests
                  </label>
                  <input
                    name="guests"
                    type="number"
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={form.guests}
                    onChange={onChange}
                    required
                  />
                </div>

                {/* Venue */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4" />
                    Venue Location
                  </label>
                  <input
                    name="venue"
                    placeholder="Enter venue address or location"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={form.venue}
                    onChange={onChange}
                    required
                  />
                </div>

                {/* Preferences */}
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Taste Preferences
                  </label>
                  <textarea
                    name="preferences"
                    placeholder="Tell us what you like: spicy, mild, traditional, fusion, specific cuisines..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    rows={3}
                    value={form.preferences}
                    onChange={onChange}
                  />
                </div>

                {/* Dietary Restrictions */}
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Dietary Restrictions
                  </label>
                  <textarea
                    name="dietaryRestrictions"
                    placeholder="Any allergies or dietary requirements: vegetarian, vegan, gluten-free, no nuts..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    rows={3}
                    value={form.dietaryRestrictions}
                    onChange={onChange}
                  />
                </div>
              </div>

              <button
                onClick={generateMenu}
                disabled={loading || !form.eventType || !form.eventDate || !form.venue}
                className="mt-8 w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>AI is Creating Your Menu...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate AI Menu</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Review & Customize Menu */}
        {step === 2 && recommended && (
          <div className="space-y-6">
            {/* Budget Summary Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-8 h-8" />
                <div>
                  <h3 className="text-2xl font-bold">Your Menu is Ready!</h3>
                  <p className="text-blue-100">Review and customize below</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-sm text-blue-100">Total Budget</span>
                  </div>
                  <div className="text-4xl font-bold">₹{recommended.estimatedBudget}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5" />
                    <span className="text-sm text-blue-100">Per Person</span>
                  </div>
                  <div className="text-4xl font-bold">₹{recommended.perPersonCost}</div>
                </div>
              </div>
            </div>

            {/* Selected Items */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Selected Menu Items</h3>
                <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
                  {recommended.items.length} Items
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {recommended.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                        {idx + 1}
                      </div>
                      <span className="font-semibold text-gray-900">{item}</span>
                    </div>
                    <button
                      onClick={() => removeItem(item)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add More Items */}
              <div className="border-t pt-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Add More Items</h4>
                <div className="max-h-80 overflow-y-auto space-y-3 bg-gray-50 rounded-xl p-4">
                  {menuItems
                    .filter(m => !recommended.items.includes(m.name))
                    .map(m => (
                      <div key={m._id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all">
                        <div>
                          <div className="font-semibold text-gray-900">{m.name}</div>
                          <div className="text-sm text-gray-500 mt-1">₹{m.pricePerPerson} per person</div>
                        </div>
                        <button
                          onClick={() => addItem(m)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Back to Details
                </button>
                <button
                  onClick={submitBooking}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StepIndicator = ({ number, label, active, completed }) => (
  <div className="flex flex-col items-center">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
      completed ? 'bg-green-600 text-white' :
      active ? 'bg-blue-600 text-white shadow-lg' :
      'bg-gray-200 text-gray-500'
    }`}>
      {completed ? <CheckCircle2 className="w-6 h-6" /> : number}
    </div>
    <span className={`mt-2 text-sm font-medium ${active ? 'text-blue-600' : 'text-gray-500'}`}>
      {label}
    </span>
  </div>
);

export default NewBookingPage;