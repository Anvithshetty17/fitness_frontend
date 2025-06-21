import React from "react";
import ActivityItem from "./ActivityItem";

function ActivityList({ activities, onDelete, onEdit }) {
  return (
    <ul>
      {activities.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No activities logged yet.
        </p>
      ) : (
        activities.map((act) => (
          <ActivityItem
            key={act._id}
            activity={act}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </ul>
  );
}

export default ActivityList;
