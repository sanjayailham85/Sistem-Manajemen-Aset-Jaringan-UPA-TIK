import React from "react";
import LocationTable from "../../components/tables/LocationTable";

const Location = () => {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Location</h1>
        <div className="bg-white rounded-lg shadow p-5">
          <LocationTable />
        </div>
      </div>
    </div>
  );
};

export default Location;
