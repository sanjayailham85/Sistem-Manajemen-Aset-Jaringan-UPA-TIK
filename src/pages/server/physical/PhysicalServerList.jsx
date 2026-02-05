import React from "react";
import PhysicalServerTable from "../../../components/tables/PhysicalServerTable";

const PhysicalServerList = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Physical</h1>
      <div className="bg-white rounded-lg shadow p-5">
        <PhysicalServerTable />
      </div>
    </div>
  );
};

export default PhysicalServerList;
