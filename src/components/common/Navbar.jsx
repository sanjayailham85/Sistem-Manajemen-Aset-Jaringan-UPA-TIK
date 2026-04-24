import { useEffect, useRef, useState } from "react";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiLogOut,
  FiSettings,
  FiChevronDown,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-16 bg-white shadow-sm px-6 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-slate-700">
        Sistem Manajemen Aset Jaringan
      </h1>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center bg-slate-100 px-3 py-2 rounded-lg w-72">
          <FiSearch className="text-slate-500 mr-2" />
          <input
            type="text"
            placeholder="Cari server, host, VM..."
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        <button className="relative text-slate-600 hover:text-slate-800 transition">
          <FiBell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            2
          </span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center">
              <FiUser className="text-slate-700" />
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-slate-700">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-slate-500">{user?.role || "-"}</p>
            </div>

            <FiChevronDown className="text-slate-500" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b">
                <p className="text-sm font-semibold text-slate-700">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-slate-500">{user?.role || "-"}</p>
              </div>

              {/* <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50">
                <FiUser />
                Profile
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50">
                <FiSettings />
                Change Password
              </button> */}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
