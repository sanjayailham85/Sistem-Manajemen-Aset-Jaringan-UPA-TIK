import React from "react";
import { useNavigate } from "react-router-dom";

const PhysicalServerTable = ({ rackId }) => {
  const navigate = useNavigate();

  const physicalServers = [
    {
      id: 1,
      name: "Server-App-01",
      ip: "10.10.1.10",
      model: "Dell PowerEdge R740",
      status: "running",
    },
    {
      id: 2,
      name: "Server-DB-01",
      ip: "10.10.1.20",
      model: "HP ProLiant DL380",
      status: "maintenance",
    },
  ];

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Nama Server</th>
            <th className="px-4 py-2 text-left">IP Address</th>
            <th className="px-4 py-2 text-left">Model</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {physicalServers.map((server) => (
            <tr
              onClick={() => navigate(`/server/physical/${server.id}`)}
              key={server.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-4 py-2">{server.name}</td>
              <td className="px-4 py-2">{server.ip}</td>
              <td className="px-4 py-2">{server.model}</td>
              <td className="px-4 py-2 capitalize">{server.status}</td>
            </tr>
          ))}

          {physicalServers.length === 0 && (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-500">
                Tidak ada physical server
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PhysicalServerTable;
