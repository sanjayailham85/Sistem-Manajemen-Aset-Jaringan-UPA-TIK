import React from "react";
import RackCard from "./RackCard";

const RackGrid = ({ racks, onEdit, onDelete }) => {
  if (!racks.length) {
    return <p className="text-gray-500 text-sm">Belum ada rack</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {racks.map((rack) => (
        <RackCard
          key={rack.id}
          rack={rack}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default RackGrid;
