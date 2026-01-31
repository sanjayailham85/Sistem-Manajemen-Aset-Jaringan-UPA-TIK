import React from "react";
import HostTable from "../../../components/tables/HostTable";

const HostList = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Guest Server</h1>
      <HostTable />
    </div>
  );
};

export default HostList;
