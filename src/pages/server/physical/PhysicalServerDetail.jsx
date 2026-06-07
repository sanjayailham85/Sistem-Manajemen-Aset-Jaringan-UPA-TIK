import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../components/common/Breadcrumb";
import { getPhysicalById } from "../../../services/physicalService";
import FilteredHostTable from "../../../components/server/host/FilteredHostTable";
import { FiEye, FiEyeOff } from "react-icons/fi";
import formatDate from "../../../utils/formatDate";
import { IMAGE_BASE_URL } from "../../../config/api";

const PhysicalServerDetail = () => {
  const { physicalId } = useParams();
  const [physical, setPhysical] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchPhysical = async () => {
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

    if (physicalId) fetchPhysical();
  }, [physicalId]);

  if (loading || !physical) {
    return (
      <div className="p-6 text-gray-500 animate-pulse">
        Loading physical server...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Detail Physical Server
        </h1>
        <p className="text-sm text-gray-500">
          Informasi lengkap server dan konfigurasi hardware
        </p>
      </div>

      <Breadcrumb
        items={[
          { label: "Racks", to: "/racks" },
          {
            label: physical?.rack?.name || "Rack",
            to: `/racks/${physical?.rack?.id}`,
          },
          { label: physical?.name || "Physical Server" },
        ]}
      />

      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="overflow-hidden rounded-lg border">
              <img
                src={
                  physical?.image
                    ? `${IMAGE_BASE_URL}/${physical.image}`
                    : "/no-image.png"
                }
                alt={physical?.name}
                className="w-full h-56 object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{physical?.name}</h2>
                <p className="text-sm text-gray-500">{physical?.ip}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Rack</p>
                <p className="font-medium">{physical?.rack?.name}</p>
              </div>

              <div>
                <p className="text-gray-500">Model</p>
                <p className="font-medium">{physical?.model}</p>
              </div>

              <div>
                <p className="text-gray-500">Owner</p>
                <p className="font-medium">
                  {physical?.owner} ({physical?.ownerContact})
                </p>
              </div>

              <div>
                <p className="text-gray-500">Tahun</p>
                <p className="font-medium">{physical?.year}</p>
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
                <p className="text-gray-500">U Number</p>
                <p className="font-medium">5</p>
              </div>
            </div>

            <div className="pt-4 border-t text-sm">
              <p className="text-gray-500 mb-1">Server Auth</p>

              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {physical?.authUsername}/
                  {showPassword
                    ? physical?.authPassword
                    : "*".repeat(physical?.authPassword?.length || 0)}
                </span>

                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <div>
              <span className="text-gray-500">Status</span>
              <p
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  physical?.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : physical?.status === "Inactive"
                    ? "bg-red-100 text-red-700"
                    : physical?.status === "Damaged"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {physical?.status}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t text-sm">
          <p className="text-gray-500">Detail</p>
          <p className="mt-1 text-gray-700">{physical?.detail}</p>
        </div>

        <div className="mt-6 pt-4 border-t flex justify-between text-xs text-gray-400">
          <span>Created: {formatDate(physical?.createdAt)}</span>
          <span>Updated: {formatDate(physical?.updatedAt)}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">Host Server</h2>
        <FilteredHostTable physicalId={physical?.id} />
      </div>
    </div>
  );
};

export default PhysicalServerDetail;
