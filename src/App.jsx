import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";

const App = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

export default App;
