import React from "react";
import IPListTable from "../../components/tables/IPListTable";

const IPList = () => {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">IP List</h1>
        <div className="bg-white rounded-lg shadow p-5">
          <IPListTable />
        </div>
      </div>
    </div>
  );
};

export default IPList;
