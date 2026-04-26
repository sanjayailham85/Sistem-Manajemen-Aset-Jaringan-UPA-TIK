import React from "react";

const MonitoringTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "all", label: "All" },
    { key: "network", label: "Network" },
    { key: "server", label: "Server" },
    { key: "security", label: "Security" },
  ];

  return (
    <div className="flex items-center gap-2 mb-4 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-3 py-1 text-sm rounded-full border transition-all
            ${
              activeTab === tab.key
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default MonitoringTabs;
