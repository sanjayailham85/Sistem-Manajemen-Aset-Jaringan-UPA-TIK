import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const HostTable = () => {
  const { physicalId } = useParams();
  const navigate = useNavigate();

  const hosts = [
    {
      id: 1,
      name: "Host-01",
      ip: "10.10.2.10",
      version: "VMware ESXi 8",
      status: "active",
    },
    {
      id: 2,
      name: "Host-02",
      ip: "10.10.2.11",
      version: "VMware ESXi 7",
      status: "inactive",
    },
  ];

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Host Name</th>
            <th className="px-4 py-2 text-left">IP Address</th>
            <th className="px-4 py-2 text-left">Version</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {hosts.map((host) => (
            <tr
              onClick={() =>
                navigate(`/server/host/${host.id}?physical=${physicalId}`)
              }
              key={host.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-4 py-2">{host.name}</td>
              <td className="px-4 py-2">{host.ip}</td>
              <td className="px-4 py-2">{host.version}</td>
              <td className="px-4 py-2 capitalize">{host.status}</td>
            </tr>
          ))}

          {hosts.length === 0 && (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-500">
                Tidak ada host server
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HostTable;
