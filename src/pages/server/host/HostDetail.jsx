import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FilteredGuestTable from "../../../components/server/guest/FilteredGuestTable";
import Breadcrumb from "../../../components/common/Breadcrumb";
import { getHostById } from "../../../services/hostService";

const HostDetail = () => {
  const { hostId } = useParams();
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHost = async () => {
      try {
        setLoading(true);
        const res = await getHostById(hostId);
        setHost(res.data);
      } catch (err) {
        console.error("Gagal mengambil data host", err);
      } finally {
        setLoading(false);
      }
    };

    if (hostId) fetchHost();
  }, [hostId]);

  if (loading || !host) return <p>Loading...</p>;

  const rackId = host?.physical?.rack?.id;
  const physicalId = host?.physical?.id;

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Racks", to: "/racks" },
          {
            label: `Rack ${host?.physical?.rack?.name}` || "Rack",
            to: rackId ? `/racks/${rackId}` : "#",
          },
          {
            label:
              `Physical Server ${host?.physical?.name}` || "Physical Server",
            to:
              rackId && physicalId
                ? `/racks/${rackId}/physical/${physicalId}`
                : "#",
          },
          { label: `Host ${host?.name}` || "Host" },
        ]}
      />

      <div>
        <h1 className="text-xl font-semibold">Detail Host Server</h1>
        <p className="text-sm text-gray-500">Informasi host dan guest server</p>
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="font-semibold mb-4">Informasi Host</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Host Name</span>
            <p className="font-medium">{host.name}</p>
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
            <p className="font-medium">{host.serverDevice}</p>
          </div>
          <div>
            <span className="text-gray-500">Status</span>
            <p className="font-medium capitalize">{host.status}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="font-semibold mb-4">Guest Server</h2>
        <div className="overflow-x-auto">
          <FilteredGuestTable hostId={host.id} />
        </div>
      </div>
    </div>
  );
};

export default HostDetail;
