import React from "react";
import GuestTable from "../../../components/tables/GuestTable";

const GuestList = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Guest</h1>
      <div className="bg-white rounded-lg shadow p-5">
        <GuestTable />
      </div>
    </div>
  );
};

export default GuestList;
