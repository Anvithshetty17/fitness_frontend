import React, { useState } from "react";
import axios from "axios";
import { 
  FiTrash2, 
  FiEdit3, 
  FiSave, 
  FiX, 
  FiActivity, 
  FiClock, 
  FiCalendar 
} from "react-icons/fi";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getActivityEmoji = (type) => {
  const t = type.toLowerCase();
  if (t.includes("run")) return "🏃";
  if (t.includes("walk")) return "🚶";
  if (t.includes("yoga")) return "🧘";
  if (t.includes("gym") || t.includes("weight")) return "🏋️";
  if (t.includes("swim")) return "🏊";
  if (t.includes("bike") || t.includes("cycling")) return "🚴";
  if (t.includes("tennis")) return "🎾";
  if (t.includes("football") || t.includes("soccer")) return "⚽";
  if (t.includes("basketball")) return "🏀";
  if (t.includes("dance")) return "💃";
  return "🏃";
};

const getActivityColor = (type) => {
  const t = type.toLowerCase();
  if (t.includes("run")) return "from-red-500 to-pink-500";
  if (t.includes("yoga")) return "from-green-500 to-emerald-500";
  if (t.includes("gym") || t.includes("weight")) return "from-blue-500 to-indigo-500";
  if (t.includes("swim")) return "from-cyan-500 to-blue-500";
  if (t.includes("bike") || t.includes("cycling")) return "from-yellow-500 to-orange-500";
  return "from-purple-500 to-indigo-500";
};

function ActivityItem({ activity, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    activity: activity.activity,
    duration: activity.duration,
    date: activity.date.slice(0, 10),
    calories: activity.calories || "",
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${BASE_URL}/api/activities/${activity._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onDelete(activity._id);
    } catch (err) {
      console.error("Failed to delete activity:", err.response?.data || err.message);
      alert("Failed to delete activity.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `${BASE_URL}/api/activities/${activity._id}`,
        {
          ...formData,
          duration: parseInt(formData.duration),
          calories: formData.calories ? parseInt(formData.calories) : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onEdit(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update activity:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Failed to update activity. Please try again.");
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activity
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiActivity className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.activity}
                onChange={(e) =>
                  setFormData({ ...formData, activity: e.target.value })
                }
                className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Activity name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiClock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Minutes"
                  required
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Calories
              </label>
              <input
                type="number"
                value={formData.calories}
                onChange={(e) =>
                  setFormData({ ...formData, calories: e.target.value })
                }
                className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Optional"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <FiSave className="w-4 h-4 mr-2" />
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <FiX className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className={`w-12 h-12 bg-gradient-to-br ${getActivityColor(activity.activity)} rounded-lg flex items-center justify-center text-xl shadow-sm`}>
            {getActivityEmoji(activity.activity)}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {activity.activity}
            </h3>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <FiClock className="w-4 h-4 mr-1" />
                <span>{activity.duration} minutes</span>
              </div>
              
              {activity.calories && (
                <div className="flex items-center">
                  <span className="mr-1">🔥</span>
                  <span>{activity.calories} calories</span>
                </div>
              )}
              
              <div className="flex items-center">
                <FiCalendar className="w-4 h-4 mr-1" />
                <span>{new Date(activity.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
            title="Edit activity"
          >
            <FiEdit3 className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50"
            title="Delete activity"
          >
            {isDeleting ? (
              <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
            ) : (
              <FiTrash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActivityItem;
