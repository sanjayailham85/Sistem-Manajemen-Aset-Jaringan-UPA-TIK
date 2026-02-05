import { FiSearch, FiBell, FiUser } from "react-icons/fi";

const Navbar = () => {
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

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center">
            <FiUser className="text-slate-700" />
          </div>
          <div className="hidden sm:block text-sm">
            <p className="font-medium text-slate-700">Admin</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
