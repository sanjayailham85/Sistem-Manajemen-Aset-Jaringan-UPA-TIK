import React from "react";
import { useParams } from "react-router-dom";
import PhysicalServerTable from "../../../components/tables/PhysicalServerTable";
import Breadcrumb from "../../../components/common/Breadcrumb";

const RackDetail = () => {
  const { rackId } = useParams();
  const rackName = rackId;

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ label: "Racks", to: "/racks" }, { label: "Physical Server" }]}
      />
      {/* Judul */}
      <div>
        <h1 className="text-2xl font-bold">Physical Server {rackName}</h1>
        <p className="text-sm text-gray-500">
          Daftar physical server yang terpasang pada rack ini
        </p>
      </div>

      {/* Physical Server List */}
      <div className="bg-white rounded-lg shadow p-5">
        <div className="overflow-x-auto">
          <PhysicalServerTable />
        </div>
      </div>
    </div>
  );
};

export default RackDetail;
