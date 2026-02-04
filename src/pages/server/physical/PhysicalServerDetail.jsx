import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/common/Breadcrumb";
import serverImage from "../../../assets/Untitled.png";
import { getPhysicalById } from "../../../services/physicalService";
import HostTable from "../../../components/tables/HostTable";

const PhysicalServerDetail = () => {
  const { rackId, physicalId } = useParams();
  const navigate = useNavigate();
  const [physical, setPhysical] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPhysicalId = async () => {
    try {
      setLoading(true);
      const res = await getPhysicalById(physicalId);
      setPhysical(res.data);
    } catch (err) {
      console.error("Gagal mengambil data physical server", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (physicalId) {
      fetchPhysicalId();
    }
  }, [physicalId]);

  const host = {
    id: 10,
    hostName: "Host-VM-01",
    ip: "10.10.1.100",
    auth: "vCenter",
    version: "ESXi 7.0",
    device: "VMware ESXi",
    status: "active",
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Racks", to: "/racks" },
          { label: "Physical Server", to: `/racks/${rackId}` },
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
              src={physical?.image}
              // alt={server.name}
              className="w-full rounded border"
            />
          </div>

          {/* Info */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Nama Server</span>
              <p className="font-medium">{physical?.name}</p>
            </div>
            <div>
              <span className="text-gray-500">IP Address</span>
              <p className="font-medium">{physical?.ip}</p>
            </div>
            <div>
              <span className="text-gray-500">Model</span>
              <p className="font-medium">{physical?.model}</p>
            </div>

            <div>
              <span className="text-gray-500">Owner</span>
              <p className="font-medium">{physical?.owner}</p>
            </div>
            <div>
              <span className="text-gray-500">Tahun Pengadaan</span>
              <p className="font-medium">{physical?.year}</p>
            </div>
            <div>
              <span className="text-gray-500">CPU</span>
              <p className="font-medium">{physical?.cpu}</p>
            </div>
            <div>
              <span className="text-gray-500">RAM</span>
              <p className="font-medium">{physical?.ram}</p>
            </div>
            <div>
              <span className="text-gray-500">Storage</span>
              <p className="font-medium">{physical?.storage}</p>
            </div>
            <div>
              <span className="text-gray-500">Status</span>
              <p className="font-medium capitalize">{physical?.status}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm">
          <span className="text-gray-500">Detail physical</span>
          <p className="mt-1">{physical?.detail}</p>
        </div>
      </div>

      {/* Host Server */}
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="font-semibold mb-4">Host Server</h2>

        <HostTable />
      </div>
    </div>
  );
};

export default PhysicalServerDetail;
