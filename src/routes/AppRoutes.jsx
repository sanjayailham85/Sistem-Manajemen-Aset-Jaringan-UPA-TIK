import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

import RackList from "../pages/server/rack/RackList";
import RackDetail from "../pages/server/rack/RackDetail";

import PhysicalServerList from "../pages/server/physical/PhysicalServerList";
import PhysicalServerDetail from "../pages/server/physical/PhysicalServerDetail";

import HostList from "../pages/server/host/HostList";
import HostDetail from "../pages/server/host/HostDetail";

import GuestList from "../pages/server/guest/GuestList";
import GuestDetail from "../pages/server/guest/GuestDetail";

import AccessPointList from "../pages/digital/accessPoint/AccessPointList";
import AccessPointDetail from "../pages/digital/accessPoint/AccessPointDetail";

import SwitchList from "../pages/digital/switch/SwitchList";
import SwitchDetail from "../pages/digital/switch/SwitchDetail";

import RouterList from "../pages/digital/router/RouterList";
import RouterDetail from "../pages/digital/router/RouterDetail";

import CCTVList from "../pages/digital/cctv/CCTVList";
import CCTVDetail from "../pages/digital/cctv/CCTVDetail";

import ActivityLogsList from "../pages/activitylogs/ActivityLogsList";
import Users from "../pages/Users";
import OsVersion from "../pages/option/OsVersion";
import AccessPointMerk from "../pages/digital/accessPoint/AccessPointMerk";
import AccessPointController from "../pages/digital/accessPoint/AccessPointController";
import SwitchMerk from "../pages/digital/switch/SwitchMerk";
import SwitchController from "../pages/digital/switch/SwitchController";
import CCTVMerk from "../pages/digital/cctv/CCTVMerk";
import CCTVController from "../pages/digital/cctv/CCTVController";
import Merk from "../pages/option/Merk";
import Location from "../pages/option/Location";
import SubDomain from "../pages/option/SubDomain";
import MonitoringPage from "../pages/monitoring/MonitoringPage";
import IPList from "../pages/digitalAsset/IPList";
import Domain from "../pages/digitalAsset/Domain";
import Lisensi from "../pages/digitalAsset/Lisensi";
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
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => {
      const currentToken = localStorage.getItem("token");
      setToken(currentToken);
    };

    window.addEventListener("storage", checkToken);

    // fallback: cek berkala
    const interval = setInterval(checkToken, 3000);

    return () => {
      window.removeEventListener("storage", checkToken);
      clearInterval(interval);
    };
  }, []);

  if (!token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Layout>{children}</Layout>;
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
        path="/digitalAsset/ipList"
        element={
          <PrivateRoute>
            <IPList />
          </PrivateRoute>
        }
      />
      <Route
        path="/digitalAsset/domain"
        element={
          <PrivateRoute>
            <Domain />
          </PrivateRoute>
        }
      />
      <Route
        path="/digitalAsset/lisensi"
        element={
          <PrivateRoute>
            <Lisensi />
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
        path="/accessPointMerk"
        element={
          <PrivateRoute>
            <AccessPointMerk />
          </PrivateRoute>
        }
      />
      <Route
        path="/accessPointMerk/:merkId"
        element={
          <PrivateRoute>
            <AccessPointController />
          </PrivateRoute>
        }
      />
      <Route
        path="/accessPointMerk/:merkId/controller/:controllerId"
        element={
          <PrivateRoute>
            <AccessPointList />
          </PrivateRoute>
        }
      />
      <Route
        path="/switchMerk"
        element={
          <PrivateRoute>
            <SwitchMerk />
          </PrivateRoute>
        }
      />
      <Route
        path="/switchMerk/:merkId"
        element={
          <PrivateRoute>
            <SwitchController />
          </PrivateRoute>
        }
      />
      <Route
        path="/switchMerk/:merkId/controller/:controllerId"
        element={
          <PrivateRoute>
            <SwitchList />
          </PrivateRoute>
        }
      />
      <Route
        path="/cctvMerk"
        element={
          <PrivateRoute>
            <CCTVMerk />
          </PrivateRoute>
        }
      />
      <Route
        path="/cctvMerk/:merkId"
        element={
          <PrivateRoute>
            <CCTVController />
          </PrivateRoute>
        }
      />
      <Route
        path="/cctvMerk/:merkId/controller/:controllerId"
        element={
          <PrivateRoute>
            <CCTVList />
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
      <Route
        path="/option/merk"
        element={
          <PrivateRoute>
            <Merk />
          </PrivateRoute>
        }
      />
      <Route
        path="/option/subDomain"
        element={
          <PrivateRoute>
            <SubDomain />
          </PrivateRoute>
        }
      />
      <Route
        path="/option/location"
        element={
          <PrivateRoute>
            <Location />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
