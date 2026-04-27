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
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => (
  <>
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 min-h-0">
        <Navbar />

        <main className="flex-1 min-h-0 overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
    <Toaster position="bottom-right" />;
  </>
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
