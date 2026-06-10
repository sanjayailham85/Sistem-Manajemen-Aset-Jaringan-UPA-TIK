import React, { useEffect, useMemo, useState } from "react";
import Tabs from "./components/Tabs";
import DeviceTable from "./components/DeviceTable";
import { socket } from "../../utils/socket";

const ITEMS_PER_PAGE = 6;

const MonitoringPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [activeSubTab, setActiveSubTab] = useState("");
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const subCategoryOrder = [
    "physical",
    "host",
    "router",
    "switch",
    "accessPoint",
    "cctv",
  ];

  const [subIndex, setSubIndex] = useState(0);

  const handleSubCategoryClick = () => {
    setSubIndex((prev) => (prev + 1) % subCategoryOrder.length);
  };

  // =====================================================
  // 🔥 SOCKET REALTIME (ONLY SOURCE OF TRUTH)
  // =====================================================
  useEffect(() => {
    console.log("Socket connected?", socket.connected);

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("SOCKET DISCONNECTED", reason);
    });

    // INIT DATA DARI SERVER
    socket.on("monitoring:init", (data) => {
      console.log("INIT RECEIVED", data?.length);
      setDevices(data || []);
    });

    // UPDATE DATA REALTIME
    socket.on("monitoring:update", (updates) => {
      console.log("UPDATE RECEIVED", updates);

      setDevices((prev) => {
        const map = new Map(prev.map((d) => [String(d.id), d]));

        updates.forEach((u) => {
          const id = String(u.id);

          map.set(id, {
            ...map.get(id),
            ...u,
          });
        });

        return Array.from(map.values());
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("monitoring:init");
      socket.off("monitoring:update");
    };
  }, []);

  // =====================================================
  // FILTER
  // =====================================================
  const filteredDevices = useMemo(() => {
    if (!devices) return [];

    let data =
      activeTab === "all"
        ? devices
        : devices.filter((d) => (d.category || "").toLowerCase() === activeTab);

    if (activeSubTab) {
      data = data.filter((d) => {
        const sub = (d.subcategory || "").toLowerCase();

        if (activeSubTab === "accesspoint") return sub === "accesspoint";
        if (activeSubTab === "physical") return sub === "physical";
        return sub === activeSubTab;
      });
    }

    return data;
  }, [devices, activeTab, activeSubTab]);

  const totalPages = Math.ceil(filteredDevices.length / ITEMS_PER_PAGE);

  const paginatedDevices = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredDevices.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDevices, page]);

  const summary = useMemo(() => {
    return {
      online: devices.filter((d) => d.monitoringStatus === "online").length,
      offline: devices.filter((d) => d.monitoringStatus === "offline").length,
      warning: devices.filter((d) => d.monitoringStatus === "warning").length,
    };
  }, [devices]);

  useEffect(() => {
    setActiveSubTab("");
  }, [activeTab]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold">Monitoring</h1>

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

      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
      />

      <DeviceTable filteredDevices={paginatedDevices} loading={loading} />

      <div className="flex justify-between items-center px-4 py-3 bg-white rounded shadow">
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
