import React from "react";
import {
  FiServer,
  FiDatabase,
  FiUsers,
  FiBox,
  FiWifi,
  FiCamera,
  FiGitBranch,
} from "react-icons/fi";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  // DEVICE STATUS DATA
  const deviceStatusData = [
    { name: "Active", value: 78 },
    { name: "Inactive", value: 18 },
    { name: "Damaged", value: 6 },
  ];

  const deviceData = [
    { name: "Router", value: 8, icon: <FiWifi className="text-blue-500" /> },
    {
      name: "Switch",
      value: 14,
      icon: <FiGitBranch className="text-purple-500" />,
    },
    {
      name: "Access Point",
      value: 6,
      icon: <FiWifi className="text-green-500" />,
    },
    { name: "CCTV", value: 10, icon: <FiCamera className="text-red-500" /> },
  ];

  const activityData = [
    { name: "Mon", activity: 5 },
    { name: "Tue", activity: 8 },
    { name: "Wed", activity: 3 },
    { name: "Thu", activity: 10 },
    { name: "Fri", activity: 6 },
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  const totalDevices = deviceData.reduce((acc, d) => acc + d.value, 0);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Rack" value="12" icon={<FiServer />} />
        <Card title="Physical Server" value="34" icon={<FiDatabase />} />
        <Card title="Host" value="18" icon={<FiBox />} />
        <Card title="Guest" value="56" icon={<FiUsers />} />
      </div>

      {/* MIDDLE SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* DEVICE STATUS */}
        <div className="lg:col-span-1 bg-white p-4 rounded-xl shadow">
          <h2 className="font-medium mb-4">Device Status Overview</h2>

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
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* STATUS INDICATORS */}
          <div className="flex justify-around mt-4">
            <StatusDot color="bg-green-500" label="Active" />
            <StatusDot color="bg-yellow-500" label="Inactive" />
            <StatusDot color="bg-red-500" label="Damaged" />
          </div>
        </div>

        {/* NETWORK DEVICES */}
        <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow flex flex-col">
          <h2 className="font-medium mb-4">Network Devices</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deviceData.map((d, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border rounded-lg hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl">{d.icon}</div>
                  <span className="font-medium">{d.name}</span>
                </div>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                  {d.value}
                </span>
              </div>
            ))}
          </div>

          {/* TOTAL DEVICE BIG CARD */}
          <div className="mt-6 flex-1 flex items-center justify-center">
            <div className="text-center bg-blue-50 w-full py-6 rounded-xl border">
              <p className="text-sm text-gray-500">Total Devices</p>
              <p className="text-4xl font-bold text-blue-600">{totalDevices}</p>
              <p className="text-xs text-gray-400 mt-1">
                All network equipment combined
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ACTIVITY LOG */}
        <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow">
          <h2 className="font-medium mb-4">Recent Activity</h2>
          <div className="space-y-3 text-sm">
            <ActivityItem
              text="Guest A berhasil ditambahkan di Host C"
              time="2 min ago"
            />
            <ActivityItem text="Host B berhasil diupdate" time="10 min ago" />
            <ActivityItem
              text="Switch S1 ditambahkan ke Rack 2"
              time="1 hour ago"
            />
          </div>
        </div>

        {/* ACTIVITY STATS */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-medium mb-4">Activity Stats</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="activity" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusDot({ color, label }) {
  return (
    <div className="flex flex-col items-center text-xs text-gray-600">
      <div className={`w-4 h-4 rounded-full ${color} mb-1`}></div>
      {label}
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
      <div className="text-2xl text-blue-500">{icon}</div>
    </div>
  );
}

function ActivityItem({ text, time }) {
  return (
    <div className="flex justify-between items-start border-b pb-2">
      <p>{text}</p>
      <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
        {time}
      </span>
    </div>
  );
}
