import React from "react";
import SubDomainTable from "../../components/tables/SubDomainTable";

const SubDomain = () => {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Sub Domain</h1>
        <div className="bg-white rounded-lg shadow p-5">
          <SubDomainTable />
        </div>
      </div>
    </div>
  );
};

export default SubDomain;
