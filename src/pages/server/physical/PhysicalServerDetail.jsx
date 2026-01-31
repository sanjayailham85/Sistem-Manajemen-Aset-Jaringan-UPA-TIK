import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/common/Breadcrumb";
import serverImage from "../../../assets/Untitled.png";

const PhysicalServerDetail = () => {
  const { rackId } = useParams();
  const { serverId } = useParams();
  const navigate = useNavigate();

  // dummy data physical server (nanti dari API)
  const server = {
    id: serverId,
    name: "Server-App-01",
    ip: "10.10.1.10",
    model: "Dell PowerEdge R740",
    rack: "Rack A1",
    rackId: 1,
    owner: "Tim Infrastruktur",
    cpu: "2x Intel Xeon Silver",
    ram: "128 GB",
    storage: "4 TB SSD",
    year: 2022,
    status: "running",
    detail: "Server digunakan untuk aplikasi internal dan layanan backend.",
    image: "../../../assets/Untitled.png",
  };

  // dummy data host server
  const host = {
    id: 10,
    hostName: "Host-VM-01",
    ip: "10.10.1.100",
    auth: "vCenter",
    version: "ESXi 7.0",
    device: "VMware ESXi",
    status: "active",
  };

  const handleOpenHost = () => {
    navigate(`/server/host/${host.id}`);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Racks", to: "/racks" },
          { label: "Physical Server", to: `/racks/:rackId` },
          { label: "Detail Physical Server" },
        ]}
      />

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Detail Physical Server</h1>
        <p className="text-sm text-gray-500">
          Informasi detail physical server dan host
        </p>
      </div>

      {/* Server Detail */}
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="font-semibold mb-4">Informasi Server</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Image */}
          <div className="md:col-span-1">
            <img
              src={serverImage}
              alt={server.name}
              className="w-full rounded border"
            />
          </div>

          {/* Info */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Nama Server</span>
              <p className="font-medium">{server.name}</p>
            </div>
            <div>
              <span className="text-gray-500">IP Address</span>
              <p className="font-medium">{server.ip}</p>
            </div>
            <div>
              <span className="text-gray-500">Model</span>
              <p className="font-medium">{server.model}</p>
            </div>
            <div>
              <span className="text-gray-500">Rack</span>
              <p className="font-medium">{server.rack}</p>
            </div>
            <div>
              <span className="text-gray-500">Owner</span>
              <p className="font-medium">{server.owner}</p>
            </div>
            <div>
              <span className="text-gray-500">Tahun Pengadaan</span>
              <p className="font-medium">{server.year}</p>
            </div>
            <div>
              <span className="text-gray-500">CPU</span>
              <p className="font-medium">{server.cpu}</p>
            </div>
            <div>
              <span className="text-gray-500">RAM</span>
              <p className="font-medium">{server.ram}</p>
            </div>
            <div>
              <span className="text-gray-500">Storage</span>
              <p className="font-medium">{server.storage}</p>
            </div>
            <div>
              <span className="text-gray-500">Status</span>
              <p className="font-medium capitalize">{server.status}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm">
          <span className="text-gray-500">Detail Server</span>
          <p className="mt-1">{server.detail}</p>
        </div>
      </div>

      {/* Host Server */}
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="font-semibold mb-4">Host Server</h2>

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
            <span className="text-gray-500">Status</span>
            <p className="font-medium capitalize">{host.status}</p>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleOpenHost}
            className="text-blue-600 hover:underline text-sm"
          >
            Lihat Detail Host & Guest Server
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhysicalServerDetail;
