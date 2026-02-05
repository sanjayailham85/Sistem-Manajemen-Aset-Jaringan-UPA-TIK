import React from "react";
import HostTable from "../../../components/tables/HostTable";

const HostList = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Host</h1>
      <div className="bg-white rounded-lg shadow p-5">
        <HostTable />
      </div>
    </div>
  );
};

export default HostList;
