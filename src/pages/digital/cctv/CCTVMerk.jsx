import React from "react";
import CCTVMerkTable from "../../../components/tables/CCTVMerkTable";

const RouterList = () => {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">CCTV Merk</h1>
        <div className="bg-white rounded-lg shadow p-5">
          <CCTVMerkTable />
        </div>
      </div>
    </div>
  );
};

export default RouterList;
