import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccessPointTable from "../../../components/tables/AccessPointTable";
import Breadcrumb from "../../../components/common/Breadcrumb";
import { getById } from "../../../services/accessPointControllerService";

const AccessPointList = () => {
  const { controllerId } = useParams();
  const [controller, setController] = useState(null);

  useEffect(() => {
    fetchController();
  }, [controllerId]);

  const fetchController = async () => {
    try {
      const res = await getById(controllerId);
      setController(res.data);
    } catch (error) {
      console.error("Failed to fetch controller", error);
    }
  };

  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Access Point</h1>

        <Breadcrumb
          items={[
            {
              label: "Access Point Merk",
              to: "/accessPointMerk",
            },
            {
              label: controller?.merk?.name || "Merk",
              to: `/accessPointMerk/${controller?.merk?.id}`,
            },
            {
              label: controller?.ip || "Controller",
            },
            {
              label: "Access Point List",
            },
          ]}
        />

        <div className="bg-white rounded-lg shadow p-5">
          <AccessPointTable />
        </div>
      </div>
    </div>
  );
};

export default AccessPointList;
