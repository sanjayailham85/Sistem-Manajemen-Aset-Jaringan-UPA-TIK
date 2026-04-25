import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import usePermission from "../../utils/usePermission";
import {
  FiHome,
  FiDatabase,
  FiServer,
  FiBox,
  FiUsers,
  FiUser,
  FiSettings,
  FiGrid,
  FiWifi,
  FiMonitor,
} from "react-icons/fi";

const Sidebar = () => {
  const { canView } = usePermission("cctv");
  const user = JSON.parse(localStorage.getItem("user"));
  const [openOption, setOpenOption] = useState(false);

  const menuClass =
    "flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-slate-700 transition";

  const activeClass = "bg-slate-700 text-white font-semibold";

  return (
    <aside className="w-64 bg-slate-800 text-slate-200 flex flex-col">
      {/* HEADER */}
      <div className="h-14 flex items-center px-4 border-b border-slate-700">
        <h1 className="text-lg font-bold">Asset Manager</h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {/* DASHBOARD */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${menuClass} ${isActive ? activeClass : ""}`
          }
        >
          <FiHome /> Dashboard
        </NavLink>

        {/* SERVER */}
        <div>
          <p className="text-xs uppercase text-slate-400 px-3 mb-2">Server</p>

          <NavLink
            to="/racks"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FiDatabase /> Rack
          </NavLink>

          <NavLink
            to="/physical"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FiServer /> Physical
          </NavLink>

          <NavLink
            to="/host"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FiGrid /> Host
          </NavLink>

          <NavLink
            to="/guest"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FiUser /> Guest
          </NavLink>
        </div>

        {/* DIGITAL DEVICE */}
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
            <FiWifi /> Access Point
          </NavLink>

          <NavLink
            to="/digital/switch"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FiBox /> Switch
          </NavLink>

          <NavLink
            to="/digital/router"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FiGrid /> Router
          </NavLink>

          <NavLink
            to="/digital/cctv"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FiMonitor /> CCTV
          </NavLink>
        </div>
        <div>
          <div className="border-t border-slate-700 my-4"></div>
          {user.role === "superadmin" && (
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `${menuClass} ${isActive ? activeClass : ""}`
              }
            >
              <FiUsers /> User Management
            </NavLink>
          )}

          {/* OPTION */}
          {/* OPTION */}
          <div>
            <button
              onClick={() => setOpenOption(!openOption)}
              className={`${menuClass} w-full justify-between`}
            >
              <span className="flex items-center gap-2">
                <FiSettings /> Option
              </span>

              <span>{openOption ? "▲" : "▼"}</span>
            </button>

            {/* SUB MENU */}
            {openOption && (
              <div className="ml-6 mt-1 space-y-1 border-l border-slate-600 pl-3">
                <NavLink
                  to="/option/osVersion"
                  className={({ isActive }) =>
                    `${menuClass} ${isActive ? activeClass : ""}`
                  }
                >
                  OS Version
                </NavLink>

                <NavLink
                  to="/option/-"
                  className={({ isActive }) =>
                    `${menuClass} ${isActive ? activeClass : ""}`
                  }
                >
                  option2
                </NavLink>

                <NavLink
                  to="/option/--"
                  className={({ isActive }) =>
                    `${menuClass} ${isActive ? activeClass : ""}`
                  }
                >
                  option3
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
