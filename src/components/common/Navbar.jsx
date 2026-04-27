import { useEffect, useRef, useState } from "react";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import { globalSearch } from "../../services/searchService";
import { buildRoute } from "../../utils/routeHelper";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [noResult, setNoResult] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // ===================== LOGOUT =====================
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  // ===================== CLOSE DROPDOWN OUTSIDE =====================
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

  // ===================== UI =====================
  return (
    <div className="h-16 bg-white shadow-sm px-6 flex items-center justify-between">
      {/* TITLE */}
      <h1 className="text-lg font-semibold text-slate-700">
        UPA TIK Asset Manager
      </h1>

      <div className="flex items-center gap-6">
        {/* ===================== SEARCH ===================== */}
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

          {/* DROPDOWN SEARCH */}
          {results.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border mt-1 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {results.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="px-3 py-2 hover:bg-slate-100 cursor-pointer text-sm"
                  onClick={() => {
                    navigate(buildRoute(item.type, item.id));
                    setResults([]);
                    setQuery("");
                  }}
                >
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-slate-500">{item.type}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===================== USER ===================== */}
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
