import React from "react";
import CCTVTable from "../../../components/tables/CCTVTable";

const RouterList = () => {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">CCTV</h1>
        <div className="bg-white rounded-lg shadow p-5">
          <CCTVTable />
        </div>
      </div>
    </div>
  );
};

export default RouterList;
