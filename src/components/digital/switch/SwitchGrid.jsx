import React from "react";
import SwitchCard from "./SwitchCard";

const SwitchGrid = ({ data, onEdit, onDelete }) => {
  if (!data.length) {
    return <p className="text-gray-500 text-sm">Belum ada Switch merk</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <SwitchCard
          key={item.id}
          switchDevice={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default SwitchGrid;
