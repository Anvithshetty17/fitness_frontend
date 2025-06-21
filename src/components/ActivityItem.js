import React, { useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaRunning, FaDumbbell, FaSpa } from "react-icons/fa";

const getIcon = (type) => {
const t = type.toLowerCase();
if (t.includes("run")) return <FaRunning color="#ff5722" />;
if (t.includes("yoga")) return <FaSpa color="#4caf50" />;
if (t.includes("gym")) return <FaDumbbell color="#2196f3" />;
return "🏃";
};

function ActivityItem({ activity, onDelete, onEdit }) {
const [isEditing, setIsEditing] = useState(false);
const [formData, setFormData] = useState({
activity: activity.activity,
duration: activity.duration,
date: activity.date.slice(0, 10),
});

const handleDelete = async () => {
const token = localStorage.getItem("token");


try {
  await axios.delete(
    `http://localhost:5000/api/activities/${activity._id}`,
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
}
};

const handleEditSubmit = async (e) => {
e.preventDefault();
const token = localStorage.getItem("token");


try {
  const res = await axios.put(
    `http://localhost:5000/api/activities/${activity._id}`,
    formData,
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
<li className="activity-item">
<form
onSubmit={handleEditSubmit}
style={{ display: "flex", gap: "10px", flexWrap: "wrap", width: "100%" }}
>
<input
value={formData.activity}
onChange={(e) =>
setFormData({ ...formData, activity: e.target.value })
}
placeholder="Activity"
/>
<input
type="number"
value={formData.duration}
onChange={(e) =>
setFormData({ ...formData, duration: e.target.value })
}
placeholder="Minutes"
/>
<input
type="date"
value={formData.date}
onChange={(e) =>
setFormData({ ...formData, date: e.target.value })
}
/>
<button type="submit">Save</button>
<button type="button" onClick={() => setIsEditing(false)}>
Cancel
</button>
</form>
</li>
);
}

return (
<li className="activity-item">
<div className="left">
<span className="icon">{getIcon(activity.activity)}</span>
<div>
<strong>{activity.activity}</strong>
<br />
<small>
{activity.duration} mins ·{" "}
{new Date(activity.date).toLocaleDateString()}
</small>
</div>
</div>
<div style={{ display: "flex", gap: "10px" }}>
<button onClick={() => setIsEditing(true)} className="edit-btn">
<FaEdit />
</button>
<button onClick={handleDelete} className="delete-btn">
<FaTrash />
</button>
</div>
</li>
);
}

export default ActivityItem;