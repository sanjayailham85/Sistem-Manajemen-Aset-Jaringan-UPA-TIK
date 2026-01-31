import React from "react";
import PhysicalServerTable from "../../../components/tables/PhysicalServerTable";

const PhysicalServerList = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Guest Server</h1>
      <PhysicalServerTable />
    </div>
  );
};

export default PhysicalServerList;
