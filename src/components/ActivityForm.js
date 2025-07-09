import React, { useState } from "react";
import axios from "axios";
import { FiActivity, FiClock, FiCalendar } from "react-icons/fi";

function ActivityForm({ onAdd }) {
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [calories, setCalories] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/activities`,
        {
          activity,
          duration: parseInt(duration),
          date,
          calories: calories ? parseInt(calories) : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onAdd(res.data);
      setActivity("");
      setDuration("");
      setDate("");
      setCalories("");
      setError("");
    } catch (err) {
      console.error("Failed to add activity:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Failed to add activity. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Activity Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiActivity className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 transition-all duration-200 placeholder-gray-400"
            placeholder="e.g., Running, Yoga, Swimming"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (minutes)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiClock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 transition-all duration-200 placeholder-gray-400"
              placeholder="30"
              required
              min="1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calories (optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 text-sm">🔥</span>
            </div>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 transition-all duration-200 placeholder-gray-400"
              placeholder="250"
              min="1"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiCalendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/50 transition-all duration-200"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
            Adding Activity...
          </div>
        ) : (
          "Add Activity"
        )}
      </button>
    </form>
  );
}

export default ActivityForm;
