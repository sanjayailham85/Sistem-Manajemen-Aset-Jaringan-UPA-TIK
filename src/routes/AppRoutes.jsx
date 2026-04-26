// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Dashboard from "../pages/Dashboard";

// // Rack
// import RackList from "../pages/server/rack/RackList";
// import RackDetail from "../pages/server/rack/RackDetail";

// import Login from "../pages/Login";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Dashboard />} />
//       <Route path="/auth/login" element={<Login />} />

//       <Route path="/racks" element={<RackList />} />
//       <Route path="/racks/:rackId" element={<RackDetail />} />

//       <Route path="/physical" element={<PhysicalServerList />} />
//       <Route
//         path="/racks/:rackId/physical/:physicalId"
//         element={<PhysicalServerDetail />}
//       />

//       <Route path="/host" element={<HostList />} />
//       <Route
//         path="/racks/:rackId/physical/:physicalId/host/:hostId"
//         element={<HostDetail />}
//       />

//       <Route path="/guest" element={<GuestList />} />
//       <Route
//         path="/racks/:rackId/physical/:physicalId/host/:hostId/guest/:guestId"
//         element={<GuestDetail />}
//       />

//       <Route path="/digital/switch" element={<SwitchList />} />
//       <Route path="/digital/switch/:id" element={<SwitchDetail />} />

//       <Route path="/digital/router" element={<RouterList />} />
//       <Route path="/digital/router/:id" element={<RouterDetail />} />
//     </Routes>
//   );
// };

// export default AppRoutes;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

import RackList from "../pages/server/rack/RackList";
import RackDetail from "../pages/server/rack/RackDetail";

// Physical Server
import PhysicalServerList from "../pages/server/physical/PhysicalServerList";
import PhysicalServerDetail from "../pages/server/physical/PhysicalServerDetail";

// Host
import HostList from "../pages/server/host/HostList";
import HostDetail from "../pages/server/host/HostDetail";

// Guest
import GuestList from "../pages/server/guest/GuestList";
import GuestDetail from "../pages/server/guest/GuestDetail";

import AccessPointList from "../pages/digital/accessPoint/AccessPointList";
import AccessPointDetail from "../pages/digital/accessPoint/AccessPointDetail";

// Switch
import SwitchList from "../pages/digital/switch/SwitchList";
import SwitchDetail from "../pages/digital/switch/SwitchDetail";

// Router
import RouterList from "../pages/digital/router/RouterList";
import RouterDetail from "../pages/digital/router/RouterDetail";

//cctv
import CCTVList from "../pages/digital/cctv/CCTVList";
import CCTVDetail from "../pages/digital/cctv/CCTVDetail";

import ActivityLogsList from "../pages/activitylogs/ActivityLogsList";
import Users from "../pages/Users";
import OsVersion from "../pages/option/OsVersion";
import MonitoringPage from "../pages/monitoring/MonitoringPage";

const Layout = ({ children }) => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className="flex-1 overflow-y-auto p-4 bg-gray-100">{children}</main>
    </div>
  </div>
);

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/racks"
        element={
          <PrivateRoute>
            <RackList />
          </PrivateRoute>
        }
      />

      <Route
        path="/racks/:rackId"
        element={
          <PrivateRoute>
            <RackDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/physical"
        element={
          <PrivateRoute>
            <PhysicalServerList />
          </PrivateRoute>
        }
      />
      <Route
        path="/racks/:rackId/physical/:physicalId"
        element={
          <PrivateRoute>
            <PhysicalServerDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/host"
        element={
          <PrivateRoute>
            <HostList />
          </PrivateRoute>
        }
      />
      <Route
        path="/racks/:rackId/physical/:physicalId/host/:hostId"
        element={
          <PrivateRoute>
            <HostDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/guest"
        element={
          <PrivateRoute>
            <GuestList />
          </PrivateRoute>
        }
      />
      <Route
        path="/racks/:rackId/physical/:physicalId/host/:hostId/guest/:guestId"
        element={
          <PrivateRoute>
            <GuestDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/digital/accessPoint"
        element={
          <PrivateRoute>
            <AccessPointList />
          </PrivateRoute>
        }
      />
      <Route
        path="/digital/accessPoint/:id"
        element={
          <PrivateRoute>
            <AccessPointDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/digital/switch"
        element={
          <PrivateRoute>
            <SwitchList />
          </PrivateRoute>
        }
      />
      <Route
        path="/digital/switch/:id"
        element={
          <PrivateRoute>
            <SwitchDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/digital/cctv"
        element={
          <PrivateRoute>
            <CCTVList />
          </PrivateRoute>
        }
      />
      <Route
        path="/digital/cctv/:id"
        element={
          <PrivateRoute>
            <CCTVDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/digital/router"
        element={
          <PrivateRoute>
            <RouterList />
          </PrivateRoute>
        }
      />
      <Route
        path="/digital/router/:id"
        element={
          <PrivateRoute>
            <RouterDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/monitoring"
        element={
          <PrivateRoute>
            <MonitoringPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/activityLogs"
        element={
          <PrivateRoute>
            <ActivityLogsList />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />
      <Route
        path="/option/osVersion"
        element={
          <PrivateRoute>
            <OsVersion />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
