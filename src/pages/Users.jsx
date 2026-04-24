import React from "react";
import UserTable from "../components/tables/UserTable";

const Users = () => {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="bg-white rounded-lg shadow p-5">
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default Users;
