import React, { useState } from "react";
import axios from "axios";

function ActivityForm({ onAdd }) {
const [activity, setActivity] = useState("");
const [duration, setDuration] = useState("");
const [date, setDate] = useState("");
const [error, setError] = useState("");

const handleSubmit = async (e) => {
e.preventDefault();


const token = localStorage.getItem("token");
if (!token) {
  setError("User not authenticated");
  return;
}

try {
  const res = await axios.post(
    "http://localhost:5000/api/activities",
    {
      activity,
      duration,
      date,
    },
    {
      headers: {
        Authorization:`Bearer ${token}`,
      },
    }
  );

  onAdd(res.data);
  setActivity("");
  setDuration("");
  setDate("");
  setError("");
} catch (err) {
console.error("Failed to add activity:", err.response?.data || err.message);
setError(err.response?.data?.msg || "Failed to add activity. Please try again.");
}
};

return (
<form onSubmit={handleSubmit}>
{error && <p style={{ color: "red" }}>{error}</p>}


  <input
    value={activity}
    onChange={(e) => setActivity(e.target.value)}
    placeholder="Activity name (e.g. Running)"
    required
  />
  <input
    type="number"
    value={duration}
    onChange={(e) => setDuration(e.target.value)}
    placeholder="Duration (in minutes)"
    required
    min="1"
  />
  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    required
  />
  <button type="submit">Add Activity</button>
</form>
);
}
export default ActivityForm;