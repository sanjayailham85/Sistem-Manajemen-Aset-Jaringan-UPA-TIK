import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/common/Breadcrumb";
import { getGuestById } from "../../../services/guestService";

const GuestDetail = () => {
  const { hostId, guestId, rackId, physicalId } = useParams();
  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchGuestId = async () => {
    try {
      setLoading(true);
      const res = await getGuestById(guestId);
      setGuest(res.data);
    } catch (err) {
      console.error("Gagal mengambil data guest", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (guestId) {
      fetchGuestId();
    }
  }, [guestId]);

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Racks", to: "/racks" },
          { label: "Physical Server", to: `/racks/${rackId}` },
          {
            label: "Detail Physical Server",
            to: `/racks/${rackId}/physical/${physicalId}`,
          },
          {
            label: `Host`,
            to: `/racks/${rackId}/physical/${physicalId}/host/${hostId}`,
          },
          { label: "Guest" },
        ]}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold ">Guest Server Detail</h1>
      </div>

      {/* Informasi Utama */}
      <div className="bg-white rounded shadow p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Instance Name</p>
          <p>{guest?.instanceName}</p>
        </div>

        <div>
          <p className="font-semibold">IP Address</p>
          <p>{guest?.ip}</p>
        </div>

        <div>
          <p className="font-semibold">Guest Auth</p>
          <p>{guest?.auth}</p>
        </div>

        <div>
          <p className="font-semibold">OS Version</p>
          <p>{guest?.osVersion}</p>
        </div>

        <div>
          <p className="font-semibold">Domain Instance</p>
          <p>{guest?.domainInstance}</p>
        </div>

        {/* <div>
          <p className="font-semibold">Server Host</p>
          <p>Host-Server-{hostId}</p>
        </div> */}

        <div className="flex flex-col gap-1 w-fit">
          <span className="text-gray-500 text-sm">Status</span>
          <p
            className={`inline-block font-medium capitalize px-2 py-1 rounded ${
              guest?.status === "aktif"
                ? "bg-green-100 text-green-700"
                : guest?.status === "tidak aktif"
                ? "bg-red-100 text-red-700"
                : guest?.status === "rusak"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {guest?.status}
          </p>
        </div>
      </div>

      {/* Spesifikasi */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Spesifikasi Guest</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>CPU - {guest?.cpu}</li>
          <li>RAM - {guest?.ram}</li>
          <li>Storage - {guest?.storage}</li>
        </ul>
      </div>

      {/* Informasi Tambahan */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Detail Server</h2>
        <p>{guest?.detail}</p>
      </div>
    </div>
  );
};

export default GuestDetail;
