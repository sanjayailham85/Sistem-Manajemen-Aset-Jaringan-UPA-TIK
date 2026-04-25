import React from "react";
import OsVersionTable from "../../components/tables/OsVersionTable";

const OsVersion = () => {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">OS Version</h1>
        <div className="bg-white rounded-lg shadow p-5">
          <OsVersionTable />
        </div>
      </div>
    </div>
  );
};

export default OsVersion;
