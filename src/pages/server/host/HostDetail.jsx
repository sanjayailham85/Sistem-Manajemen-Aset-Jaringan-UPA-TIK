import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FilteredGuestTable from "../../../components/server/guest/FilteredGuestTable";
import Breadcrumb from "../../../components/common/Breadcrumb";
import { getHostById } from "../../../services/hostService";
import { FiEye, FiEyeOff } from "react-icons/fi";
import formatDate from "../../../utils/formatDate";

const HostDetail = () => {
  const { hostId } = useParams();
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHostPassword, setShowHostPassword] = useState(false);
  const [showPhysicalPassword, setShowPhysicalPassword] = useState(false);

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

  if (loading || !host) {
    return (
      <div className="p-6 text-gray-500 animate-pulse">
        Loading host detail...
      </div>
    );
  }

  const physical = host?.physical;

  const rackId = physical?.rack?.id;
  const physicalId = physical?.id;

  const imageUrl = `http://localhost:5000/uploads/${physical?.image}`;
  console.log(host);

  const format = (date) => (date ? formatDate(date) : "-");
  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Detail Host Server</h1>
        <p className="text-sm text-gray-500">
          Informasi host, physical server, dan guest
        </p>
      </div>

      <Breadcrumb
        items={[
          { label: "Racks", to: "/racks" },
          { label: `Rack ${physical?.rack?.name}`, to: `/racks/${rackId}` },
          {
            label: `Physical ${physical?.name}`,
            to:
              rackId && physicalId
                ? `/racks/${rackId}/physical/${physicalId}`
                : "#",
          },
          { label: host?.name },
        ]}
      />

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* HOST CARD */}
        <div className="bg-white rounded-xl shadow p-5 space-y-4">
          <h2 className="font-semibold text-lg border-b pb-2">
            Host Information
          </h2>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium">{host.name}</p>
            </div>

            <div>
              <p className="text-gray-500">IP</p>
              <p className="font-medium">{host.ip}</p>
            </div>

            <div className="pt-4 border-t text-sm">
              <p className="text-gray-500 mb-1">Auth</p>

              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {host?.authUsername}/
                  {showHostPassword
                    ? host?.authPassword
                    : "*".repeat(host?.authPassword?.length || 0)}
                </span>

                <button
                  onClick={() => setShowHostPassword(!showHostPassword)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {showHostPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div>
              <p className="text-gray-500">Version</p>
              <p className="font-medium">
                {host?.osName} {host?.osVersion}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Device</p>
              <p className="font-medium">{host.serverDevice}</p>
            </div>

            <div>
              <span className="text-gray-500">Status</span>
              <p
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  host.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : host.status === "Inactive"
                    ? "bg-red-100 text-red-700"
                    : host.status === "Damaged"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {host.status}
              </p>{" "}
            </div>

            <div className="pt-3 border-t text-xs text-gray-400">
              Created: {format(host.createdAt)}
            </div>
            <div className="text-xs text-gray-400">
              Updated: {format(host.updatedAt)}
            </div>
          </div>
        </div>

        {/* PHYSICAL CARD */}
        <div className="bg-white rounded-xl shadow p-5 xl:col-span-2 space-y-5">
          <h2 className="font-semibold text-lg border-b pb-2">
            Physical Server
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* IMAGE */}
            <div>
              <img
                src={imageUrl}
                alt={physical?.name}
                className="w-full h-48 object-cover rounded-lg border"
              />
            </div>

            {/* INFO */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium">{physical?.name}</p>
              </div>

              <div>
                <p className="text-gray-500">IP</p>
                <p className="font-medium">{physical?.ip}</p>
              </div>

              <div>
                <p className="text-gray-500">Rack</p>
                <p className="font-medium">{physical?.rack?.name}</p>
              </div>

              <div>
                <p className="text-gray-500">Model</p>
                <p className="font-medium">{physical?.model}</p>
              </div>

              <div>
                <p className="text-gray-500">CPU</p>
                <p className="font-medium">{physical?.cpu}</p>
              </div>

              <div>
                <p className="text-gray-500">RAM</p>
                <p className="font-medium">{physical?.ram}</p>
              </div>

              <div>
                <p className="text-gray-500">Storage</p>
                <p className="font-medium">{physical?.storage}</p>
              </div>

              <div>
                <p className="text-gray-500">Year</p>
                <p className="font-medium">{physical?.year}</p>
              </div>
            </div>
            <div>
              <span className="text-gray-500">Status</span>
              <p
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  host?.physical?.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : host?.physical?.status === "Inactive"
                    ? "bg-red-100 text-red-700"
                    : host?.physical?.status === "Damaged"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {host?.physical?.status}
              </p>
            </div>
          </div>

          {/* DETAIL */}
          <div className="text-sm pt-4 pb-5 border-t">
            <p className="text-gray-500">Detail</p>
            <p className="mt-1 text-gray-700">{physical?.detail}</p>
          </div>

          {/* FOOTER */}
          <div className="flex justify-between text-xs text-gray-400 border-t pt-2">
            <span>Created: {format(physical?.createdAt)}</span>
            <span>Updated: {format(physical?.updatedAt)}</span>
          </div>
        </div>
      </div>

      {/* GUEST */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="font-semibold text-lg mb-4">Guest Server</h2>
        <FilteredGuestTable hostId={host.id} />
      </div>
    </div>
  );
};

export default HostDetail;
