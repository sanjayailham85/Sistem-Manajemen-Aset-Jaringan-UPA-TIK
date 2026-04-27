import React from "react";
import RackCard from "./RackCard";

const RackGrid = ({ data, onEdit, onDelete }) => {
  if (!data.length) {
    return <p className="text-gray-500 text-sm">Belum ada rack</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <RackCard
          key={item.rack.id}
          rack={item.rack}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default RackGrid;
