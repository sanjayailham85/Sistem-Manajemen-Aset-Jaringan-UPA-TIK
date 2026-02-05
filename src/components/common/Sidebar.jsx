import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuClass =
    "block px-3 py-2 rounded text-sm hover:bg-slate-700 transition";

  const activeClass = "bg-slate-700 text-white font-semibold";

  return (
    <aside className="w-64 bg-slate-800 text-slate-200 flex flex-col">
      <div className="h-14 flex items-center px-4 border-b border-slate-700">
        <h1 className="text-lg font-bold tracking-wide">Asset Manager</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto ">
        <div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            Dashboard
          </NavLink>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-400 px-3 mb-2">Server</p>
          <NavLink
            to="/racks"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            Rack
          </NavLink>
          <NavLink
            to="/physical"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            Physical
          </NavLink>
          <NavLink
            to="/host"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            Host
          </NavLink>
          <NavLink
            to="/guest"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            Guest
          </NavLink>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-400 px-3 mb-2">
            Digital Device
          </p>
          <NavLink
            to="/digital/accessPoint"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            Access Point
          </NavLink>
          <NavLink
            to="/digital/switch"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            Switch
          </NavLink>
          <NavLink
            to="/digital/router"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            Router
          </NavLink>
          <NavLink
            to="/digital/cctv"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            CCTV
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
