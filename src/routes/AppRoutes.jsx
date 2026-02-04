import React from "react";
import { Routes, Route } from "react-router-dom";

/* =======================
   DASHBOARD
======================= */
import Dashboard from "../pages/Dashboard";

/* =======================
   SERVER
======================= */
// Rack
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

/* =======================
   DIGITAL DEVICE
======================= */
// Switch
import SwitchList from "../pages/digital/switch/SwitchList";
import SwitchDetail from "../pages/digital/switch/SwitchDetail";

// Router
import RouterList from "../pages/digital/router/RouterList";
import RouterDetail from "../pages/digital/router/RouterDetail";

/* =======================
   APP ROUTES
======================= */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Dashboard />} />

      {/* Server - Rack */}
      <Route path="/racks" element={<RackList />} />
      <Route path="/racks/:rackId" element={<RackDetail />} />

      {/* Server - Physical */}
      <Route path="/racks/:rackId/physical" element={<PhysicalServerList />} />
      <Route
        path="/racks/:rackId/physical/:physicalId"
        element={<PhysicalServerDetail />}
      />

      {/* Server - Host */}
      <Route
        path="/racks/:rackId/physical/:physicalId/host"
        element={<HostList />}
      />
      <Route
        path="/racks/:rackId/physical/:physicalId/host/:hostId"
        element={<HostDetail />}
      />

      {/* Server - Guest */}
      <Route
        path="/racks/:rackId/physical/:physicalId/host/:hostId/guest"
        element={<GuestList />}
      />
      <Route
        path="/racks/:rackId/physical/:physicalId/host/:hostId/guest/:guestId"
        element={<GuestDetail />}
      />

      {/* Digital Device */}
      <Route path="/digital/switch" element={<SwitchList />} />
      <Route path="/digital/switch/:id" element={<SwitchDetail />} />

      <Route path="/digital/router" element={<RouterList />} />
      <Route path="/digital/router/:id" element={<RouterDetail />} />
    </Routes>
  );
};

export default AppRoutes;
