import React from "react";
import ActivityItem from "./ActivityItem";
import { FiActivity } from "react-icons/fi";

function ActivityList({ activities, onDelete, onEdit }) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiActivity className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No activities yet</h3>
        <p className="text-gray-600">Start your fitness journey by adding your first activity!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((act) => (
        <ActivityItem
          key={act._id}
          activity={act}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default ActivityList;
