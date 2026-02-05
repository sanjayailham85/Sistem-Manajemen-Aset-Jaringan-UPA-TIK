import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../components/common/Breadcrumb";
import FilteredPhysicalTable from "../../../components/server/physical/FilteredPhysicalTable";

const RackDetail = () => {
  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ label: "Racks", to: "/racks" }, { label: "Physical Server" }]}
      />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Physical Server</h1>
          <p className="text-sm text-gray-500">
            Daftar physical server yang terpasang pada rack ini
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <div className="overflow-x-auto">
          <FilteredPhysicalTable />
        </div>
      </div>
    </div>
  );
};

export default RackDetail;
