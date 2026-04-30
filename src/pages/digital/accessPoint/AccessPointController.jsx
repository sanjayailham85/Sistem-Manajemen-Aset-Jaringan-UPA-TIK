import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../../../services/accessPointMerkService";

import ControllerTable from "../../../components/tables/AccessPointControllerTable";
import Breadcrumb from "../../../components/common/Breadcrumb";

const AccessPointController = () => {
  const { merkId } = useParams();
  const [merk, setMerk] = useState(null);

  useEffect(() => {
    fetchMerk();
  }, [merkId]);

  const fetchMerk = async () => {
    try {
      const res = await getById(merkId);
      setMerk(res.data);
    } catch (error) {
      console.error("Failed to fetch merk", error);
    }
  };

  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Access Point Controller</h1>

        <Breadcrumb
          items={[
            {
              label: "Access Point Merk",
              to: "/accessPointMerk",
            },
            {
              label: merk?.name || "Controller",
            },
          ]}
        />

        <div className="bg-white rounded-lg shadow p-5">
          <ControllerTable />
        </div>
      </div>
    </div>
  );
};

export default AccessPointController;
