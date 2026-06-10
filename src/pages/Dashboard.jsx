import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiServer,
  FiDatabase,
  FiUser,
  FiGrid,
  FiRadio,
  FiShuffle,
  FiGlobe,
  FiCamera,
  FiClock,
} from "react-icons/fi";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { getRecent } from "../services/activityLogService";
import { getDashboardSummary } from "../services/dashboardService";

const Dashboard = () => {
  const [openMerk, setOpenMerk] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    racks: 0,
    physical: 0,
    host: 0,
    guest: 0,
    devices: [],
    totalDevices: 0,
    deviceStatus: [],
    deviceStatusPerDevice: {},
    cctvByMerk: [],
    accessPointByMerk: [],
    switchByMerk: [],
  });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const summary = await getDashboardSummary();
        setDashboardData(summary);

        const activity = await getRecent(5);
        setActivities(activity.data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);
  const deviceStatusData = (dashboardData.deviceStatus || []).filter(
    (item) => item.value > 0
  );

  const statusColors = {
    Active: "#22c55e",
    Inactive: "#ef4444",
    Damaged: "#f59e0b",
  };

  const addIcons = (devices = []) =>
    devices.map((device) => {
      const iconMap = {
        Router: <FiGlobe className="text-blue-500" />,
        Switch: <FiShuffle className="text-purple-500" />,
        "Access Point": <FiRadio className="text-green-500" />,
        CCTV: <FiCamera className="text-red-500" />,
      };

      return {
        ...device,
        icon: iconMap[device.name] || <FiDatabase />,
      };
    });

  const devices = addIcons(dashboardData.devices);
  const deviceRoutes = {
    Router: "/digital/router",
    "Access Point": "/accessPointMerk",
    Switch: "/switchMerk",
    CCTV: "/cctvMerk",
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <span className="text-sm text-gray-500">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  const devicePieData = [
    { name: "Physical Server", value: dashboardData.physical },
    { name: "Host", value: dashboardData.host },
    { name: "Guest", value: dashboardData.guest },
    {
      name: "CCTV",
      value: dashboardData.devices.find((d) => d.name === "CCTV")?.value || 0,
    },
    {
      name: "Router",
      value: dashboardData.devices.find((d) => d.name === "Router")?.value || 0,
    },
    {
      name: "Switch",
      value: dashboardData.devices.find((d) => d.name === "Switch")?.value || 0,
    },
    {
      name: "Access Point",
      value:
        dashboardData.devices.find((d) => d.name === "Access Point")?.value ||
        0,
    },
  ].filter((item) => item.value > 0);
  const deviceColors = {
    "Physical Server": "#3b82f6", // blue
    Host: "#22c55e", // green
    Guest: "#a855f7", // purple
    CCTV: "#ef4444", // red
    Router: "#06b6d4", // cyan
    Switch: "#f97316", // orange
    "Access Point": "#84cc16", // lime
  };
  const deviceDotColors = [
    { label: "Physical Server", color: "bg-blue-500" },
    { label: "Host", color: "bg-green-500" },
    { label: "Guest", color: "bg-purple-500" },
    { label: "CCTV", color: "bg-red-500" },
    { label: "Router", color: "bg-cyan-500" },
    { label: "Switch", color: "bg-orange-500" },
    { label: "Access Point", color: "bg-lime-500" },
  ];
  const globalStatus = dashboardData.deviceStatusPerDevice || {};

  const totalActive = Object.values(globalStatus).reduce(
    (acc, device) => acc + (device.Active || 0),
    0
  );

  const totalInactive = Object.values(globalStatus).reduce(
    (acc, device) => acc + (device.Inactive || 0),
    0
  );

  const totalDamaged = Object.values(globalStatus).reduce(
    (acc, device) => acc + (device.Damaged || 0),
    0
  );
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          onClick={() => navigate("/racks")}
          title="Total Rack"
          total={dashboardData.racks}
          icon={<FiDatabase />}
        />
        <Card
          onClick={() => navigate("/physical")}
          title="Physical Server"
          total={dashboardData.physical}
          status={
            dashboardData.deviceStatusPerDevice?.physicalServer || {
              Active: 0,
              Inactive: 0,
              Damaged: 0,
            }
          }
          icon={<FiServer />}
        />
        <Card
          onClick={() => navigate("/host")}
          title="Host"
          icon={<FiGrid />}
          total={dashboardData.host}
          status={
            dashboardData.deviceStatusPerDevice?.host || {
              Active: 0,
              Inactive: 0,
              Damaged: 0,
            }
          }
        />
        <Card
          onClick={() => navigate("/guest")}
          title="Guest"
          total={dashboardData.guest}
          status={
            dashboardData.deviceStatusPerDevice?.guest || {
              Active: 0,
              Inactive: 0,
              Damaged: 0,
            }
          }
          icon={<FiUser />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-medium mb-4">Total Device</h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={devicePieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  label
                >
                  {devicePieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={deviceColors[entry.name] || "#94a3b8"}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 columns-2 gap-4">
            {deviceDotColors.map((item, index) => (
              <div key={index} className="mb-2 break-inside-avoid">
                <StatusDot color={item.color} label={item.label} />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow w-full">
          <h2 className="font-medium mb-4">Device Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {devices.map((device, index) => {
              const status = dashboardData.deviceStatusPerDevice?.[
                device.name.toLowerCase().replace(" ", "")
              ] || {
                Active: 0,
                Inactive: 0,
                Damaged: 0,
              };

              return (
                <div
                  onClick={() => navigate(deviceRoutes[device.name])}
                  key={index}
                  className="p-4 border rounded-lg space-y-3 cursor-pointer"
                >
                  {/* HEADER */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{device.icon}</div>
                      <span className="font-medium">{device.name}</span>
                    </div>

                    <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                      Total: {device.value}
                    </span>
                  </div>

                  {/* STATUS COMPACT */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center bg-green-50 rounded py-1">
                      <div className="font-semibold text-green-600">
                        {showValue(status.Active)}
                      </div>
                      <div className="text-green-600">Active</div>
                    </div>

                    <div className="text-center bg-yellow-50 rounded py-1">
                      <div className="font-semibold text-red-600">
                        {showValue(status.Inactive)}
                      </div>
                      <div className="text-red-600">Inactive</div>
                    </div>

                    <div className="text-center bg-red-50 rounded py-1">
                      <div className="font-semibold text-yellow-600">
                        {showValue(status.Damaged)}
                      </div>
                      <div className="text-yellow-600">Damaged</div>
                    </div>
                  </div>

                  {(device.name === "CCTV" ||
                    device.name === "Access Point" ||
                    device.name === "Switch") && (
                    <div className="mt-3 border-t pt-2 text-[11px]">
                      <p className="text-gray-800 mb-1 ">By Merk</p>

                      <div className="space-y-1">
                        {(device.name === "CCTV"
                          ? dashboardData.cctvByMerk
                          : device.name === "Access Point"
                          ? dashboardData.accessPointByMerk
                          : dashboardData.switchByMerk
                        )?.map((item, i) => (
                          <div key={i} className="flex justify-between">
                            <span className="text-gray-600">{item.merk}</span>
                            <span className="font-medium">
                              {showValue(item.total)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="bg-white rounded-xl shadow p-6 mt-3">
            <p className="text-sm text-gray-500 mb-4 text-center">
              Total Status Devices
            </p>

            <div className="flex justify-evenly items-center">
              <div className="text-center">
                <p className="text-green-600 text-2xl font-bold">
                  {totalActive}
                </p>
                <p className="text-xs text-gray-500">Active</p>
              </div>

              <div className="w-px h-10 bg-gray-200" />

              <div className="text-center">
                <p className="text-red-600 text-2xl font-bold">
                  {totalInactive}
                </p>
                <p className="text-xs text-gray-500">Inactive</p>
              </div>

              <div className="w-px h-10 bg-gray-200" />

              <div className="text-center">
                <p className="text-yellow-600 text-2xl font-bold">
                  {totalDamaged}
                </p>
                <p className="text-xs text-gray-500">Damaged</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-medium mb-4">Recent Activity</h2>

        <div className="space-y-3 text-sm">
          {activities.map((item) => (
            <ActivityItem
              key={item.id}
              text={`${item.name} ${item.description}`}
              time={item.created_at}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatusDot = ({ color, label }) => (
  <div className="flex flex-col items-center text-xs text-gray-600">
    <div className={`w-4 h-4 rounded-full ${color} mb-1`} />
    {label}
  </div>
);

const formatNumber = (num) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  // if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  return num;
};
const showValue = (val) => (val === 0 ? "-" : formatNumber(val));

const Card = ({ title, total, icon, status, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-4 rounded-xl shadow cursor-pointer"
  >
    {/* HEADER */}
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold">{total}</p>
      </div>
      <div className="text-2xl text-blue-500">{icon}</div>
    </div>

    {/* STATUS MINI (COMPACT BAR) */}
    {status && (
      <div className="mt-4 flex gap-2 text-[11px]">
        <span className="flex items-center gap-1 text-green-600">
          ● Active {showValue(status.Active)}
        </span>

        <span className="flex items-center gap-1 text-red-600">
          ● Inactive {showValue(status.Inactive)}
        </span>

        <span className="flex items-center gap-1 text-yellow-600">
          ● Damaged {showValue(status.Damaged)}
        </span>
      </div>
    )}
  </div>
);

const ActivityItem = ({ text, time }) => (
  <div className="flex justify-between items-start border-b pb-3">
    <div className="flex items-start gap-3">
      <FiClock className="text-blue-500 mt-1" />
      <p>{text}</p>
    </div>
    <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{time}</span>
  </div>
);

export default Dashboard;
