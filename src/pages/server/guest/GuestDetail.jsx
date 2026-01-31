import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/common/Breadcrumb";

const GuestDetail = () => {
  const { hostId, guestId, rackId, physicalId } = useParams();

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Racks", to: "/racks" },
          { label: "Physical Server", to: `/racks/${rackId}` },
          {
            label: "Detail Physical Server",
            to: `/server/physical/${physicalId}`,
          },
          { label: `Host`, to: `/server/host/${hostId}` },
          { label: "Guest" },
        ]}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Guest Server Detail</h1>
      </div>

      {/* Informasi Utama */}
      <div className="bg-white rounded shadow p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Instance Name</p>
          <p>Guest-VM-01</p>
        </div>

        <div>
          <p className="font-semibold">IP Address</p>
          <p>192.168.10.21</p>
        </div>

        <div>
          <p className="font-semibold">Guest Auth</p>
          <p>user / ********</p>
        </div>

        <div>
          <p className="font-semibold">OS Version</p>
          <p>Ubuntu Server 22.04</p>
        </div>

        <div>
          <p className="font-semibold">Domain Instance</p>
          <p>vm01.dc.local</p>
        </div>

        <div>
          <p className="font-semibold">Server Host</p>
          <p>Host-Server-{hostId}</p>
        </div>

        <div>
          <p className="font-semibold">Status</p>
          <span className="inline-block px-3 py-1 text-sm rounded bg-green-100 text-green-700">
            Active
          </span>
        </div>
      </div>

      {/* Spesifikasi */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Spesifikasi Server</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>CPU: 4 vCPU</li>
          <li>RAM: 8 GB</li>
          <li>Storage: 100 GB</li>
        </ul>
      </div>

      {/* Informasi Tambahan */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Detail Server</h2>
        <p>
          Guest server ini digunakan untuk menjalankan aplikasi internal data
          center dan layanan monitoring.
        </p>
      </div>
    </div>
  );
};

export default GuestDetail;
