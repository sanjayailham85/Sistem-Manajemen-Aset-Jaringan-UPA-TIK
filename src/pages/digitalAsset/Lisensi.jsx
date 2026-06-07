import React from "react";
import LisensiTable from "../../components/tables/LisensiTable";

const Lisensi = () => {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Lisensi</h1>
        <div className="bg-white rounded-lg shadow p-5">
          <LisensiTable />
        </div>
      </div>
    </div>
  );
};

export default Lisensi;
