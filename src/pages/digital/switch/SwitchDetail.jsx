import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSwitchById } from "../../../services/switchService";
import formatDate from "../../../utils/formatDate";
import { IMAGE_BASE_URL } from "../../../config/api";

const SwitchDetail = () => {
  const { id } = useParams();
  const [switchDevice, setSwitch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSwitch = async () => {
      try {
        setLoading(true);
        const res = await getSwitchById(id);
        setSwitch(res.data);
      } catch (err) {
        console.error("Gagal mengambil data Switch", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSwitch();
  }, [id]);

  if (loading || !switchDevice) {
    return (
      <div className="p-6 text-gray-500 animate-pulse">Loading switch...</div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Detail Switch</h1>
        <p className="text-sm text-gray-500">
          Informasi lengkap perangkat jaringan
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="overflow-hidden rounded-lg border">
              <img
                src={
                  switchDevice?.image
                    ? `${IMAGE_BASE_URL}/${switchDevice.image}`
                    : "/no-image.png"
                }
                alt={switchDevice?.name}
                className="w-full h-56 object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-5">
            <div>
              <h2 className="text-xl font-semibold">{switchDevice?.name}</h2>
              <p className="text-sm text-gray-500">{switchDevice?.ip}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Type</p>
                <p className="font-medium">{switchDevice?.type}</p>
              </div>

              <div>
                <p className="text-gray-500">Merk</p>
                <p className="font-medium">{switchDevice?.merk}</p>
              </div>
              <div>
                <p className="text-gray-500">Code</p>
                <p className="font-medium">{switchDevice?.code}</p>
              </div>
              <div>
                <p className="text-gray-500">Location</p>
                <p className="font-medium">{switchDevice?.location}</p>
              </div>
              <div>
                <p className="text-gray-500">Location Detail</p>
                <p className="font-medium">{switchDevice?.locationDetail}</p>
              </div>

              <div>
                <div className="text-gray-500">Status</div>
                <p
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    switchDevice?.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : switchDevice?.status === "Inactive"
                      ? "bg-red-100 text-red-700"
                      : switchDevice?.status === "Damaged"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {switchDevice?.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t text-sm">
          <p className="text-gray-500">Detail</p>
          <p className="mt-1 text-gray-700">{switchDevice?.detail}</p>
        </div>

        <div className="mt-6 pt-4 border-t flex justify-between text-xs text-gray-400">
          <span>Created: {formatDate(switchDevice?.createdAt)}</span>
          <span>Updated: {formatDate(switchDevice?.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default SwitchDetail;
