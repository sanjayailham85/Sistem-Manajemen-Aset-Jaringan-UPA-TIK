import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import GuestTable from "../../../components/tables/GuestTable";
import Breadcrumb from "../../../components/common/Breadcrumb";

const HostDetail = () => {
  const { rackId } = useParams();
  const { physicalId } = useParams();
  const { hostId } = useParams();
  const navigate = useNavigate();

  // dummy data host
  const host = {
    id: hostId,
    hostName: "Host-VM-01",
    ip: "10.10.1.100",
    auth: "vCenter",
    version: "ESXi 7.0",
    device: "VMware ESXi",
    cpu: "2x Intel Xeon Gold",
    ram: "256 GB",
    storage: "10 TB SSD",
    status: "active",
  };

  // dummy data guest server
  const guests = [
    {
      id: 1,
      name: "vm-app-01",
      ip: "10.10.2.10",
      os: "Ubuntu 20.04",
      owner: "Tim Aplikasi",
      status: "running",
    },
    {
      id: 2,
      name: "vm-db-01",
      ip: "10.10.2.20",
      os: "CentOS 7",
      owner: "Tim Database",
      status: "running",
    },
    {
      id: 3,
      name: "vm-test-01",
      ip: "10.10.2.30",
      os: "Windows Server 2019",
      owner: "Tim QA",
      status: "stopped",
    },
  ];

  const handleOpenGuest = (guestId) => {
    navigate(`/server/host/${guestId}/guest`);
  };

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
          { label: "Host" },
        ]}
      />

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Detail Host Server</h1>
        <p className="text-sm text-gray-500">Informasi host dan guest server</p>
      </div>

      {/* Host Info */}
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="font-semibold mb-4">Informasi Host</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Host Name</span>
            <p className="font-medium">{host.hostName}</p>
          </div>
          <div>
            <span className="text-gray-500">IP Address</span>
            <p className="font-medium">{host.ip}</p>
          </div>
          <div>
            <span className="text-gray-500">Host Auth</span>
            <p className="font-medium">{host.auth}</p>
          </div>
          <div>
            <span className="text-gray-500">Host Version</span>
            <p className="font-medium">{host.version}</p>
          </div>
          <div>
            <span className="text-gray-500">Server Device</span>
            <p className="font-medium">{host.device}</p>
          </div>
          <div>
            <span className="text-gray-500">CPU</span>
            <p className="font-medium">{host.cpu}</p>
          </div>
          <div>
            <span className="text-gray-500">RAM</span>
            <p className="font-medium">{host.ram}</p>
          </div>
          <div>
            <span className="text-gray-500">Storage</span>
            <p className="font-medium">{host.storage}</p>
          </div>
          <div>
            <span className="text-gray-500">Status</span>
            <p className="font-medium capitalize">{host.status}</p>
          </div>
        </div>
      </div>

      {/* Guest List */}
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="font-semibold mb-4">Guest Server</h2>

        <div className="overflow-x-auto">
          <GuestTable />
        </div>
      </div>
    </div>
  );
};

export default HostDetail;
