import React from "react";
import GuestTable from "../../../components/tables/GuestTable";
import Breadcrumb from "../../../components/common/Breadcrumb";

const GuestList = () => {
  return (
    <div className="space-y-4">
      <Breadcrumb
        items={[
          { label: "Server", to: "/server/rack" },
          { label: "Host", to: `/server/host/${hostId}` },
          { label: "Guest" },
        ]}
      />

      <h1 className="text-2xl font-bold">Guest Server</h1>
      <GuestTable />
    </div>
  );
};

export default GuestList;
