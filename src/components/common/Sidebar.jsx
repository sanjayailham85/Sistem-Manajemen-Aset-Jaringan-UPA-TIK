import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import usePermission from "../../utils/usePermission";
import {
  FiHome,
  FiDatabase,
  FiServer,
  FiLink,
  FiUsers,
  FiUser,
  FiSettings,
  FiGrid,
  FiMonitor,
  FiList,
  FiRadio,
  FiShuffle,
  FiGlobe,
  FiCamera,
} from "react-icons/fi";

const Sidebar = () => {
  const { canView } = usePermission("cctv");
  const user = JSON.parse(localStorage.getItem("user"));
  const [openOption, setOpenOption] = useState(false);

  const menuClass =
    "flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-slate-700 transition";

  const activeClass = "bg-slate-700 text-white font-semibold";

  return (
    <aside className="w-64 h-full bg-slate-800 text-slate-200 flex flex-col">
      <div className="h-14 flex items-center px-4 border-b border-slate-700">
        <h1 className="text-lg font-bold">Asset Manager</h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${menuClass} ${isActive ? activeClass : ""}`
          }
        >
          <FiHome /> Dashboard
        </NavLink>

        <NavLink
          to="/monitoring"
          className={({ isActive }) =>
            `${menuClass} ${isActive ? activeClass : ""}`
          }
        >
          <FiMonitor /> Monitoring
        </NavLink>

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

        <div>
          <p className="text-xs uppercase text-slate-400 px-3 mb-2">
            Network Device
          </p>

          <NavLink
            to="/accessPointMerk"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FiRadio /> Access Point
          </NavLink>

          <NavLink
            to="/digital/switch"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FiShuffle /> Switch
          </NavLink>

          <NavLink
            to="/digital/router"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FiGlobe /> Router
          </NavLink>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-400 px-3 mb-2">
            Security Device
          </p>

          <NavLink
            to="/cctvMerk"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FiCamera /> CCTV
          </NavLink>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-400 px-3 mb-2">
            Digital Asset
          </p>

          <NavLink
            to="/digitalAsset/ipList"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FiLink /> IP List
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
          <NavLink
            to="/activityLogs"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : ""}`
            }
          >
            <FiList /> Activity Logs
          </NavLink>

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
                  to="/option/merk"
                  className={({ isActive }) =>
                    `${menuClass} ${isActive ? activeClass : ""}`
                  }
                >
                  Merk
                </NavLink>

                <NavLink
                  to="/option/location"
                  className={({ isActive }) =>
                    `${menuClass} ${isActive ? activeClass : ""}`
                  }
                >
                  Location
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
