import React from "react";
import AccessPointMerkTable from "../../../components/tables/AccessPointMerkTable";

const RouterList = () => {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Access Point Merk</h1>
        <div className="bg-white rounded-lg shadow p-5">
          <AccessPointMerkTable />
        </div>
      </div>
    </div>
  );
};

export default RouterList;
