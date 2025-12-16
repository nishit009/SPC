// frontend/src/pages/UserDashboard.jsx
import { Link } from "react-router-dom";
import { Calendar, History, MessageSquare, Sparkles, ArrowRight, TrendingUp, Clock, Zap } from "lucide-react";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header with Animation */}
        <div className="mb-8 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10" />
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md mb-4 border border-blue-100">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">AI-Powered Platform</span>
          </div>
          <h1 className="text-5xl font-bold mb-3 bg-linear-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            Welcome Back!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Ready to create unforgettable culinary experiences? Let's get started.
          </p>
        </div>

        {/* Quick Actions Grid - Enhanced */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <DashboardCard
            to="/new-booking"
            icon={<Calendar className="w-10 h-10" />}
            title="Create New Booking"
            description="Plan your perfect event with AI-powered menu generation tailored to your preferences"
            gradient="from-blue-500 via-blue-600 to-indigo-600"
            badge="AI Powered"
            stats="Instant Recommendations"
            accentColor="blue"
          />

          <DashboardCard
            to="/bookings"
            icon={<History className="w-10 h-10" />}
            title="Booking History"
            description="View, manage, and download proposals for all your past and upcoming catering events"
            gradient="from-indigo-500 via-indigo-600 to-purple-600"
            stats="Track Progress"
            accentColor="indigo"
          />

          <DashboardCard
            to="/assistant"
            icon={<MessageSquare className="w-10 h-10" />}
            title="Food Assistant"
            description="Chat with our intelligent AI assistant for instant menu ideas and event planning support"
            gradient="from-purple-500 via-purple-600 to-pink-600"
            badge="24/7 Support"
            stats="Real-time Answers"
            accentColor="purple"
          />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* AI Features Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-50 -z-10" />
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">AI-Powered Features</h2>
            </div>

            <div className="space-y-4">
              <FeatureItem
                icon={<Zap className="w-5 h-5 text-blue-600" />}
                title="Instant Menu Generation"
                description="Get personalized menus in seconds based on your event details and preferences"
              />
              <FeatureItem
                icon={<TrendingUp className="w-5 h-5 text-indigo-600" />}
                title="Smart Budget Planning"
                description="Receive accurate cost estimates and optimize your menu to fit your budget"
              />
              <FeatureItem
                icon={<Clock className="w-5 h-5 text-purple-600" />}
                title="24/7 AI Support"
                description="Our intelligent assistant is always available to answer your questions"
              />
            </div>
          </div>

          {/* Getting Started Card */}
          <div className="bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-2xl font-bold mb-4">Getting Started is Easy</h2>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Follow these simple steps to create your first catering event with AI assistance
              </p>

              <div className="space-y-3">
                <StepItem number="1" text="Click 'Create New Booking' above" />
                <StepItem number="2" text="Enter your event details and preferences" />
                <StepItem number="3" text="Review AI-generated menu recommendations" />
                <StepItem number="4" text="Customize and confirm your booking" />
              </div>

              <Link
                to="/new-booking"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Start Your First Event
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Our Platform?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <BenefitCard
              title="Save Time"
              value="90%"
              description="Faster booking process with AI automation"
              color="blue"
            />
            <BenefitCard
              title="Perfect Match"
              value="98%"
              description="Client satisfaction with AI recommendations"
              color="green"
            />
            <BenefitCard
              title="Menu Options"
              value="500+"
              description="Combinations available instantly"
              color="purple"
            />
            <BenefitCard
              title="Cost Savings"
              value="25%"
              description="Average savings with optimized menus"
              color="orange"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ to, icon, title, description, gradient, badge, stats, accentColor }) => {
  const colorMap = {
    blue: "from-blue-500 to-blue-600",
    indigo: "from-indigo-500 to-indigo-600",
    purple: "from-purple-500 to-purple-600"
  };

  return (
    <Link
      to={to}
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      {/* Background Gradient on Hover */}
      <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 bg-linear-to-r ${gradient} text-white text-xs font-bold rounded-full shadow-md animate-pulse`}>
            {badge}
          </span>
        </div>
      )}

      <div className="relative">
        {/* Icon */}
        <div className={`inline-flex p-4 rounded-2xl bg-linear-to-r ${gradient} text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Stats Badge */}
        {stats && (
          <div className={`inline-flex items-center gap-2 px-3 py-1 bg-linear-to-r ${colorMap[accentColor]} bg-opacity-10 rounded-full mb-4`}>
            <div className={`w-2 h-2 bg-linear-to-r ${colorMap[accentColor]} rounded-full animate-pulse`} />
            <span className={`text-xs font-semibold bg-linear-to-r ${colorMap[accentColor]} bg-clip-text text-transparent`}>
              {stats}
            </span>
          </div>
        )}

        {/* Arrow */}
        <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all duration-300">
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

const FeatureItem = ({ icon, title, description }) => (
  <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
    <div className="shrink-0 w-10 h-10 bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const StepItem = ({ number, text }) => (
  <div className="flex items-center gap-3">
    <div className="shrink-0 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center font-bold">
      {number}
    </div>
    <span className="text-blue-50">{text}</span>
  </div>
);

const BenefitCard = ({ title, value, description, color }) => {
  const colorMap = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-pink-600",
    orange: "from-orange-500 to-red-500"
  };

  return (
    <div className="text-center p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-lg transition-all duration-300">
      <div className={`text-4xl font-bold mb-2 bg-linear-to-r ${colorMap[color]} bg-clip-text text-transparent`}>
        {value}
      </div>
      <div className="font-semibold text-gray-900 mb-2">{title}</div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default UserDashboard;