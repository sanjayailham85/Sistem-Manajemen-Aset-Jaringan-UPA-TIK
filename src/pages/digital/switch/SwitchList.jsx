import React from "react";
import SwitchTable from "../../../components/tables/SwitchTable";

const SwitchList = () => {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Switch</h1>
        <div className="bg-white rounded-lg shadow p-5">
          <SwitchTable />
        </div>
      </div>
    </div>
  );
};

export default SwitchList;
