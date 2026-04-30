import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../components/common/Breadcrumb";
import { getGuestById } from "../../../services/guestService";
import { FiEye, FiEyeOff } from "react-icons/fi";
import formatDate from "../../../utils/formatDate";

const GuestDetail = () => {
  const { guestId } = useParams();
  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showGuestPassword, setShowGuestPassword] = useState(false);
  const [showHostPassword, setShowHostPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchGuest = async () => {
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

    if (guestId) fetchGuest();
  }, [guestId]);

  if (loading || !guest) return <p>Loading...</p>;

  const rackId = guest.host?.physical?.rack?.id;
  const physicalId = guest.host?.physical?.id;
  const hostId = guest.host?.id;

  const imageUrl = `http://localhost:5000/uploads/${guest.host?.physical?.image}`;

  const hostCreatedAt = formatDate(guest?.host?.createdAt);
  const hostUpdatedAt = formatDate(guest?.host?.updatedAt);
  const physicalCreatedAt = formatDate(guest?.host?.physical?.createdAt);
  const physicalUpdatedAt = formatDate(guest?.host?.physical?.updatedAt);
  const guestCreatedAt = formatDate(guest?.createdAt);
  const guestUpdatedAt = formatDate(guest?.updatedAt);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Guest Server Detail</h1>
        <p className="text-sm text-gray-500">
          Informasi guest, host, dan physical server
        </p>
      </div>
      <Breadcrumb
        items={[
          { label: "Racks", to: "/racks" },
          {
            label: guest.host?.physical?.rack?.name || "Rack",
            to: `/racks/${rackId}`,
          },
          {
            label: `Physical Server ${guest.host?.physical?.name}`,
            to: `/racks/${rackId}/physical/${physicalId}`,
          },
          {
            label: `Host ${guest.host?.name}`,
            to: `/racks/${rackId}/physical/${physicalId}/host/${hostId}`,
          },
          {
            label: `Guest ${guest.name}`,
          },
        ]}
      />

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold text-lg mb-4 border-b pb-2">
          Informasi Guest
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 text-sm">
          <div>
            <span className="text-gray-500">Instance Name</span>
            <p className="font-medium">{guest.name}</p>
          </div>

          <div>
            <span className="text-gray-500">IP Address</span>
            <p className="font-medium">{guest.ip}</p>
          </div>

          <div className="flex items-center gap-2">
            <p className="font-medium">
              {guest.authUsername}/
              {showGuestPassword
                ? guest.authPassword
                : "*".repeat(guest.authPassword?.length || 0)}
            </p>

            <button
              onClick={() => setShowGuestPassword(!showGuestPassword)}
              className="text-gray-500"
            >
              {showGuestPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          <div>
            <span className="text-gray-500">OS Version</span>
            <p className="font-medium">{guest.osVersion}</p>
          </div>

          <div>
            <span className="text-gray-500">Domain Instance</span>
            <p className="font-medium">{guest.domainInstance}</p>
          </div>

          <div>
            <span className="text-gray-500">Status</span>
            <p
              className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                guest.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : guest.status === "Inactive"
                  ? "bg-red-100 text-red-700"
                  : guest.status === "Damaged"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {guest.status}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 border-t pt-3 md:grid-cols-4 gap-4 mt-6 text-sm">
          <div>
            <span className="text-gray-500">Model</span>
            <p>{guest.model}</p>
          </div>
          <div>
            <span className="text-gray-500">CPU</span>
            <p>{guest.cpu}</p>
          </div>
          <div>
            <span className="text-gray-500">RAM</span>
            <p>{guest.ram}</p>
          </div>
          <div>
            <span className="text-gray-500">Storage</span>
            <p>{guest.storage}</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t text-sm">
          <span className="text-gray-500">Detail Guest</span>
          <p className="mt-1">{guest.detail}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t text-xs text-gray-400 mt-4">
          <div>
            <p>Created</p>
            <p className="text-gray-600 mt-1">{guestCreatedAt}</p>
          </div>
          <div>
            <p>Updated</p>
            <p className="text-gray-600 mt-1">{guestUpdatedAt}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
        <div className="bg-white rounded-xl shadow p-5 flex flex-col">
          <h2 className="font-semibold text-lg mb-4 border-b pb-2">
            Informasi Host
          </h2>

          <div className="space-y-4 text-sm">
            <div>
              <span className="text-gray-500">Host Name</span>
              <p className="font-medium">{guest.host?.name}</p>
            </div>

            <div>
              <span className="text-gray-500">IP Address</span>
              <p className="font-medium">{guest.host?.ip}</p>
            </div>

            <div className="relative w-fit">
              <p className="font-medium pr-8">
                {guest.host?.authUsername}/
                {showHostPassword
                  ? guest.host?.authPassword
                  : "*".repeat(guest.host?.authPassword?.length || 0)}
              </p>

              <button
                onClick={() => setShowHostPassword(!showHostPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showHostPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>
            </div>

            <div>
              <span className="text-gray-500">Host Version</span>
              <p className="font-medium">
                {guest.host?.osName} {guest.host?.osVersion}
              </p>
            </div>

            <div>
              <span className="text-gray-500">Server Device</span>
              <p className="font-medium">{guest.host?.serverDevice}</p>
            </div>

            <div>
              <span className="text-gray-500">Status</span>
              <p
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  guest.host?.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : guest.host?.status === "Inactive"
                    ? "bg-red-100 text-red-700"
                    : guest.host?.status === "Damaged"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {guest.host?.status}
              </p>{" "}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t text-xs text-gray-400 mt-auto">
            <div>
              <p>Created</p>
              <p className="text-gray-600 mt-1">{hostCreatedAt}</p>
            </div>
            <div>
              <p>Updated</p>
              <p className="text-gray-600 mt-1">{hostUpdatedAt}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 xl:col-span-2">
          <h2 className="font-semibold text-lg mb-4 border-b pb-2">
            Informasi Server
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <img
                src={imageUrl}
                alt={guest.host?.physical?.name}
                className="w-full rounded-lg border object-cover"
              />
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Nama Server</span>
                <p className="font-medium">{guest.host?.physical?.name}</p>
              </div>

              <div>
                <span className="text-gray-500">IP Address</span>
                <p className="font-medium">{guest.host?.physical?.ip}</p>
              </div>

              <div>
                <span className="text-gray-500">Server Auth</span>
                <div className="relative w-fit">
                  <p className="font-medium pr-8">
                    {guest.host?.physical?.authUsername}/
                    {showPassword
                      ? guest.host?.physical?.authPassword
                      : "*".repeat(
                          guest.host?.physical?.authPassword?.length || 0
                        )}
                  </p>

                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-gray-500">Rack Name</span>
                <p className="font-medium">
                  {guest.host?.physical?.rack?.name}
                </p>
              </div>

              <div>
                <span className="text-gray-500">Model</span>
                <p className="font-medium">{guest.host?.physical?.model}</p>
              </div>

              <div>
                <span className="text-gray-500">Owner</span>
                <p className="font-medium">
                  {guest.host?.physical?.owner} (
                  {guest.host?.physical?.ownerContact})
                </p>
              </div>

              <div>
                <span className="text-gray-500">Tahun</span>
                <p className="font-medium">{guest.host?.physical?.year}</p>
              </div>

              <div>
                <span className="text-gray-500">CPU</span>
                <p className="font-medium">{guest.host?.physical?.cpu}</p>
              </div>

              <div>
                <span className="text-gray-500">RAM</span>
                <p className="font-medium">{guest.host?.physical?.ram}</p>
              </div>

              <div>
                <span className="text-gray-500">Storage</span>
                <p className="font-medium">{guest.host?.physical?.storage}</p>
              </div>
            </div>
            <div>
              <span className="text-gray-500">Status</span>
              <p
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  guest.host?.physical?.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : guest.host?.physical?.status === "Inactive"
                    ? "bg-red-100 text-red-700"
                    : guest.host?.physical?.status === "Damaged"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {guest.host?.physical?.status}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t text-sm">
            <span className="text-gray-500">Detail Physical</span>
            <p className="mt-1">{guest.host?.physical?.detail}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t text-xs text-gray-400 mt-4">
            <div>
              <p>Created</p>
              <p className="text-gray-600 mt-1">{physicalCreatedAt}</p>
            </div>
            <div>
              <p>Updated</p>
              <p className="text-gray-600 mt-1">{physicalUpdatedAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestDetail;
