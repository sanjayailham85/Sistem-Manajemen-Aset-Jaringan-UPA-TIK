import React from "react";
import AccessPointTable from "../../../components/tables/AccessPointTable";

const RouterList = () => {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Access Point</h1>
        <div className="bg-white rounded-lg shadow p-5">
          <AccessPointTable />
        </div>
      </div>
    </div>
  );
};

export default RouterList;
