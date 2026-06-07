import React from "react";
import CCTVCard from "./CCTVCard";

const CCTVGrid = ({ data, onEdit, onDelete }) => {
  if (!data.length) {
    return <p className="text-gray-500 text-sm">Belum ada CCTV merk</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <CCTVCard
          key={item.id}
          cctv={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CCTVGrid;
