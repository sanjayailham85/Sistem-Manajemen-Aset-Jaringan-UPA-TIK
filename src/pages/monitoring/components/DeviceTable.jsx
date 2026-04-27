import React, { useState, useEffect } from "react";
import StatusBadge from "./StatusBadge";
import { getAllDevicesMonitoring } from "../../../services/monitoringService";

const DeviceTable = ({ filteredDevices }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left text-gray-600">
          <tr>
            <th className="p-3">Device</th>
            <th className="p-3">Category</th>
            <th className="p-3">IP Address</th>
            <th className="p-3">Status</th>
            <th className="p-3">Ping</th>
          </tr>
        </thead>

        <tbody>
          {filteredDevices.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-10 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

                  <span className="text-sm text-gray-500">
                    Loading devices...
                  </span>
                </div>
              </td>
            </tr>
          ) : (
            filteredDevices.map((device) => (
              <tr key={device.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{device.name}</td>
                <td className="p-3 capitalize">{device.category}</td>
                <td className="p-3 text-gray-600">{device.ip}</td>

                <td className="p-3">
                  <StatusBadge status={device.monitoringStatus} />
                </td>

                <td className="p-3">
                  {device.ping ? `${device.ping} ms` : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceTable;
