import React from "react";
import DomainTable from "../../components/tables/DomainTable";

const Domain = () => {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Domain</h1>
        <div className="bg-white rounded-lg shadow p-5">
          <DomainTable />
        </div>
      </div>
    </div>
  );
};

export default Domain;
