import React from "react";
import MerkTable from "../../components/tables/MerkTable";

const Merk = () => {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Merk</h1>
        <div className="bg-white rounded-lg shadow p-5">
          <MerkTable />
        </div>
      </div>
    </div>
  );
};

export default Merk;
