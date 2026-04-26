import React from "react";

const StatusBadge = ({ status }) => {
  const statusMap = {
    online: {
      label: "Online",
      color: "bg-green-500",
    },
    offline: {
      label: "Offline",
      color: "bg-red-500",
    },
    warning: {
      label: "Warning",
      color: "bg-yellow-500",
    },
  };

  const current = statusMap[status] || {
    label: "Unknown",
    color: "bg-gray-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs font-medium text-white rounded-full ${current.color}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 opacity-80" />
      {current.label}
    </span>
  );
};

export default StatusBadge;
