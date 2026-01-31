import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const GuestTable = () => {
  const { hostId } = useParams();
  const navigate = useNavigate();

  const guests = [
    { id: 1, name: "VM-01", ip: "192.168.1.10", status: "active" },
    { id: 2, name: "VM-02", ip: "192.168.1.11", status: "inactive" },
  ];

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Nama</th>
            <th className="px-4 py-2 text-left">IP</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((g) => (
            <tr
              onClick={() => navigate(`/server/host/${hostId}/guest/${g.id}`)}
              key={g.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-4 py-2">{g.name}</td>
              <td className="px-4 py-2">{g.ip}</td>
              <td className="px-4 py-2 capitalize">{g.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestTable;
