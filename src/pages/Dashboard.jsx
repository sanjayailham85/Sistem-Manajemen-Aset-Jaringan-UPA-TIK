import React, { useEffect, useState } from "react";
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
  const [activities, setActivities] = useState([]);
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
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const summary = await getDashboardSummary();
        setDashboardData(summary);

        const activity = await getRecent(5);
        setActivities(activity.data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
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

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Total Rack"
          total={dashboardData.racks}
          icon={<FiDatabase />}
        />
        <Card
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
          <h2 className="font-medium mb-4">Status Overview</h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  label
                >
                  {deviceStatusData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={statusColors[entry.name] || "#94a3b8"}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-around mt-4">
            <StatusDot color="bg-green-500" label="Active" />
            <StatusDot color="bg-red-500" label="Inactive" />
            <StatusDot color="bg-yellow-500" label="Damaged" />
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
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  {/* HEADER */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{device.icon}</div>
                      <span className="font-medium">{device.name}</span>
                    </div>

                    <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                      {device.value}
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
                  {/* BY MERK (KHUSUS CCTV & ACCESS POINT) */}
                  {(device.name === "CCTV" ||
                    device.name === "Access Point") && (
                    <div className="mt-3 border-t pt-2 text-[11px]">
                      <p className="text-gray-800 mb-1 ">By Merk</p>

                      <div className="space-y-1">
                        {(device.name === "CCTV"
                          ? dashboardData.cctvByMerk
                          : dashboardData.accessPointByMerk
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
          {/* TOTAL */}
          <div className="mt-6 text-center bg-blue-50 py-5 rounded-xl border">
            <p className="text-sm text-gray-500">Total Devices</p>
            <p className="text-4xl font-bold text-blue-600">
              {dashboardData.totalDevices}
            </p>
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

const Card = ({ title, total, icon, status }) => (
  <div className="bg-white p-4 rounded-xl shadow">
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
