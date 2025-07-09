import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiPlus, FiLogOut, FiActivity, FiTrendingUp } from "react-icons/fi";

import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Dashboard = ({ onLogout }) => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in again.");
      setLoading(false);
      return;
    }

    axios
      .get(`${BASE_URL}/api/activities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setActivities(res.data);
        setLoading(false);
        console.log("Activities received:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err.response?.data || err.message);
        setError("Failed to load activities. Please try again later.");
        setLoading(false);
      });
  }, []);

  const addActivity = (newActivity) => {
    setActivities((prev) => [newActivity, ...prev]);
    setShowAddForm(false);
  };

  const deleteActivity = (id) => {
    setActivities((prev) => prev.filter((act) => act._id !== id));
  };

  const editActivity = (updatedActivity) => {
    setActivities((prev) =>
      prev.map((act) => (act._id === updatedActivity._id ? updatedActivity : act))
    );
  };

  // Calculate stats
  const totalActivities = activities.length;
  const totalDuration = activities.reduce((sum, activity) => sum + (activity.duration || 0), 0);
  const totalCalories = activities.reduce((sum, activity) => sum + (activity.calories || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                  <span className="text-xl">🏋️</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Fitness Tracker</h1>
                  <p className="text-sm text-gray-600">Your wellness journey</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <FiLogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading your activities...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❌</span>
                </div>
                <p className="text-red-600 font-medium text-lg">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <FiActivity className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Activities</p>
                      <p className="text-3xl font-bold text-gray-900">{totalActivities}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                        <FiTrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Duration</p>
                      <p className="text-3xl font-bold text-gray-900">{totalDuration} min</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">🔥</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Calories Burned</p>
                      <p className="text-3xl font-bold text-gray-900">{totalCalories}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Add Activity Card */}
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">Add New Activity</h2>
                      <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="inline-flex items-center px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <FiPlus className="w-4 h-4 mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                  
                  {showAddForm && (
                    <div className="p-6">
                      <ActivityForm onAdd={addActivity} />
                    </div>
                  )}
                  
                  {!showAddForm && (
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiPlus className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600 mb-4">Ready to track your next workout?</p>
                      <button
                        onClick={() => setShowAddForm(true)}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <FiPlus className="w-5 h-5 mr-2" />
                        Add Activity
                      </button>
                    </div>
                  )}
                </div>

                {/* Activities List */}
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Your Activities</h2>
                    <p className="text-gray-600 text-sm mt-1">Track your fitness progress</p>
                  </div>
                  <div className="p-6">
                    <ActivityList
                      activities={activities}
                      onDelete={deleteActivity}
                      onEdit={editActivity}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
