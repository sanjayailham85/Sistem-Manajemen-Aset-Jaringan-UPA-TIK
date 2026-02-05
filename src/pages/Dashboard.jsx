import { useEffect, useState } from "react";
import { FiServer, FiGrid, FiCpu, FiBox } from "react-icons/fi";
import { getDashboardStat } from "../services/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    rack: 0,
    physicalServer: 0,
    host: 0,
    guest: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await getDashboardStat();
      setStats(res.data.data);
    } catch (error) {
      console.error("Gagal ambil statistik:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Rak"
          value={stats.rack}
          icon={<FiGrid size={22} />}
        />
        <StatCard
          title="Physical Server"
          value={stats.physicalServer}
          icon={<FiServer size={22} />}
        />
        <StatCard title="Host" value={stats.host} icon={<FiCpu size={22} />} />
        <StatCard
          title="Guest"
          value={stats.guest}
          icon={<FiBox size={22} />}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm xl:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">
            Aktivitas Terbaru
          </h3>

          <ul className="space-y-3 text-sm text-slate-600">
            <li>
              Server <b>A</b> ditambahkan ke Rak A1
            </li>
            <li>
              Host <b>B</b> berhasil diperbarui
            </li>
            <li>
              Guest <b>C</b> dibuat pada Host B
            </li>
            <li>
              Data IP Server <b>C</b> diperbarui
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">
            Ringkasan Sistem
          </h3>

          <div className="space-y-3 text-sm text-slate-600">
            <p>
              Rak dengan server terbanyak: <b>Rak B</b>
            </p>

            <p>
              Server rusak: <b>2 unit</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-slate-800">{value}</h3>
      </div>
      <div className="bg-slate-100 p-3 rounded-lg text-slate-700">{icon}</div>
    </div>
  );
};

export default Dashboard;
