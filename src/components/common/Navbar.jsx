import { useEffect, useRef, useState } from "react";
import {
  FiSearch,
  FiKey,
  FiUser,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import { globalSearch } from "../../services/searchService";
import { buildRoute } from "../../utils/routeHelper";
import ChangePasswordModal from "../user/ChangePasswordModal";
import { updatePassword } from "../../services/userService";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [noResult, setNoResult] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }

      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]);
        setNoResult(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const timeoutRef = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    console.log("INPUT:", value);

    clearTimeout(timeoutRef.current);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await globalSearch(value);

        setResults(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log("ERROR:", err);
        setResults([]);
      }
    }, 300);
  };

  const handleChangePassword = async (data) => {
    try {
      await updatePassword(data);
      alert("Password berhasil diubah");
      setShowPasswordModal(false);
    } catch (error) {
      alert(error.response?.data?.message || "Gagal mengubah password");
    }
  };

  return (
    <div className="h-16 bg-white shadow-sm px-6 flex items-center justify-between">
      {/* TITLE */}
      <h1 className="text-lg font-semibold text-slate-700">
        UPA TIK Asset Manager
      </h1>

      <div className="flex items-center gap-6">
        <div
          ref={searchRef}
          className="hidden md:flex items-center bg-slate-100 px-3 py-2 rounded-lg w-72 relative"
        >
          <FiSearch className="text-slate-500 mr-2" />
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search device..."
            className="bg-transparent outline-none w-full text-sm"
          />

          {results.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border mt-2 rounded-xl shadow-xl z-50 max-h-72 overflow-y-auto">
              {results.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b last:border-b-0 transition"
                  onClick={() => {
                    navigate(buildRoute(item.type, item.id));
                    setResults([]);
                    setQuery("");
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-sm text-slate-800">
                      {item.name}
                    </div>
                    <span className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-600 capitalize">
                      {item.type}
                    </span>
                  </div>

                  <div className="mt-1 text-xs text-slate-500 space-y-1">
                    <div>IP : {item.ip || "-"}</div>
                    <div>Lokasi : {item.location || "-"}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

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

              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-800 hover:bg-gray-50"
              >
                <FiKey />
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}
          {showPasswordModal && (
            <ChangePasswordModal
              onClose={() => setShowPasswordModal(false)}
              onSubmit={handleChangePassword}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
