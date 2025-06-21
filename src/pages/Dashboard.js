import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";

const Dashboard = ({ onLogout }) => {
const [activities, setActivities] = useState([]);
const [error, setError] = useState("");
const [loading, setLoading] = useState(true);

useEffect(() => {
const token = localStorage.getItem("token");


if (!token) {
  setError("No token found. Please log in again.");
  setLoading(false);
  return;
}

axios
  .get("http://localhost:5000/api/activities", {
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
};

const deleteActivity = (id) => {
setActivities((prev) => prev.filter((act) => act._id !== id));
};

const editActivity = (updatedActivity) => {
setActivities((prev) =>
prev.map((act) => (act._id === updatedActivity._id ? updatedActivity : act))
);
};

return (
  <div className="container">
    <div className="header">
      <div className="logo">🏋️ Fitness Tracker</div>
      <button className="btn-danger" onClick={onLogout}>Logout</button>
    </div>

    {loading ? (
      <p style={{ textAlign: "center", marginTop: "120px" }}>Loading activities...</p>
    ) : error ? (
      <p style={{ color: "red", textAlign: "center", marginTop: "120px" }}>{error}</p>
    ) : (
      <div className="main-content">
        <div className="left-panel">
          <div className="add-activity-card">
            <h3>Add New Activity</h3>
            <ActivityForm onAdd={addActivity} />
          </div>
          <div className="activities-list">
            <h3>Your Activities</h3>
            <ActivityList
              activities={activities}
              onDelete={deleteActivity}
              onEdit={editActivity}
            />
          </div>
        </div>
        
      </div>
    )}
  </div>
);
}
export default Dashboard;