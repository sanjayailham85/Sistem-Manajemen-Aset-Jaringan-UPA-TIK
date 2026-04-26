import React, { useEffect, useMemo, useState } from "react";
import Tabs from "./components/Tabs";
import DeviceTable from "./components/DeviceTable";
import { getAllDevicesMonitoring } from "../../services/monitoringService";
import { socket } from "../../utils/socket";

const ITEMS_PER_PAGE = 6;

const MonitoringPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        setLoading(true);
        const res = await getAllDevicesMonitoring();
        setDevices(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
  }, []);

  useEffect(() => {
    socket.on("monitoring:update", (updates) => {
      setDevices((prevDevices) =>
        prevDevices.map((device) => {
          const updated = updates.find((u) => u.id === device.id);
          return updated ? { ...device, ...updated } : device;
        })
      );
    });

    return () => {
      socket.off("monitoring:update");
    };
  }, []);

  const filteredDevices = useMemo(() => {
    if (!devices) return [];
    if (activeTab === "all") return devices;
    return devices.filter((d) => d.category === activeTab);
  }, [devices, activeTab]);

  const totalPages = Math.ceil(filteredDevices.length / ITEMS_PER_PAGE);

  const paginatedDevices = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredDevices.slice(start, end);
  }, [filteredDevices, page]);

  const summary = useMemo(() => {
    return {
      online: devices.filter((d) => d.monitoringStatus === "online").length,
      offline: devices.filter((d) => d.monitoringStatus === "offline").length,
      warning: devices.filter((d) => d.monitoringStatus === "warning").length,
    };
  }, [devices]);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold">Monitoring</h1>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          label="Online"
          value={summary.online}
          color="bg-green-500"
        />
        <SummaryCard
          label="Offline"
          value={summary.offline}
          color="bg-red-500"
        />
        <SummaryCard
          label="Warning"
          value={summary.warning}
          color="bg-yellow-500"
        />
      </div>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <DeviceTable filteredDevices={paginatedDevices} loading={loading} />

      {/* 🔥 PAGINATION (SAMA STYLE DENGAN ACTIVITY LOGS) */}
      <div className="flex justify-between items-center px-4 py-3  bg-white rounded shadow">
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages || 1}
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ label, value, color }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
    </div>
  );
};

export default MonitoringPage;
