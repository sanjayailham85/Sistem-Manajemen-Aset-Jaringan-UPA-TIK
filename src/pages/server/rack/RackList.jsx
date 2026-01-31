import React from "react";
import { useNavigate } from "react-router-dom";
import RackCard from "../../../components/server/rack/RackCard";

const RackList = () => {
  const navigate = useNavigate();

  // dummy data (nanti ganti API)
  const racks = [
    {
      id: 1,
      name: "Rack A1",
      location: "Data Center Lt.1",
      totalServer: 12,
      status: "active",
    },
    {
      id: 2,
      name: "Rack A2",
      location: "Data Center Lt.1",
      totalServer: 8,
      status: "maintenance",
    },
  ];

  const handleClick = (rackId) => {
    navigate(`/racks/${rackId}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Rack Server</h1>
        <p className="text-sm text-gray-500">
          Daftar rack server di data center
        </p>
      </div>

      {/* Grid Rack */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {racks.map((rack) => (
          <RackCard
            key={rack.id}
            rack={rack}
            onClick={() => handleClick(rack.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default RackList;
