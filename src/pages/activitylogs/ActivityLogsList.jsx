import React from "react";
import ActivityLogsTable from "../../components/tables/ActivityLogsTable";

const RouterList = () => {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Activity Logs</h1>
        <div className="bg-white rounded-lg shadow p-5">
          <ActivityLogsTable />
        </div>
      </div>
    </div>
  );
};

export default RouterList;
