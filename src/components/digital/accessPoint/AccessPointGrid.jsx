import React from "react";
import AccessPointCard from "./AccessPointCard";

const AccessPointGrid = ({ data, onEdit, onDelete }) => {
  if (!data.length) {
    return <p className="text-gray-500 text-sm">Belum ada Access Point merk</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <AccessPointCard
          key={item.id}
          accessPoint={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AccessPointGrid;
