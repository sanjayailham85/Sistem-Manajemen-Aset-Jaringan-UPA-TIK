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
    networkDevices: [],
    securityDevices: [],
    totalDevices: 0,
    deviceStatus: [],
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
    Inactive: "#f59e0b",
    Damaged: "#ef4444",
  };

  const addIcons = (devices) =>
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

  const networkDevices = addIcons(dashboardData.networkDevices);
  const securityDevices = addIcons(dashboardData.securityDevices);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Total Rack"
          value={dashboardData.racks}
          icon={<FiDatabase />}
        />
        <Card
          title="Physical Server"
          value={dashboardData.physical}
          icon={<FiServer />}
        />
        <Card title="Host" value={dashboardData.host} icon={<FiGrid />} />
        <Card title="Guest" value={dashboardData.guest} icon={<FiUser />} />
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
            <StatusDot color="bg-yellow-500" label="Inactive" />
            <StatusDot color="bg-red-500" label="Damaged" />
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow">
          <h2 className="font-medium mb-4">Device Summary</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <DeviceSection title="Network Devices" items={networkDevices} />
            <DeviceSection title="Security Devices" items={securityDevices} />
          </div>

          <div className="mt-6 text-center bg-blue-50 py-5 rounded-xl border">
            <p className="text-sm text-gray-500">Total Devices</p>
            <p className="text-4xl font-bold text-blue-600">
              {dashboardData.totalDevices}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Combined from all devices
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

const Card = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
    <div className="text-2xl text-blue-500">{icon}</div>
  </div>
);

const DeviceSection = ({ title, items }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-500 mb-3">{title}</h3>
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 border rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="text-xl">{item.icon}</div>
            <span className="font-medium">{item.name}</span>
          </div>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
            {item.value}
          </span>
        </div>
      ))}
    </div>
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
