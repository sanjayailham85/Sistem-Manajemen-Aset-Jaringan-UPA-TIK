import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwitchTable from "../../../components/tables/SwitchTable";
import Breadcrumb from "../../../components/common/Breadcrumb";
import { getById } from "../../../services/switchControllerService";

const SwitchList = () => {
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
        <h1 className="text-2xl font-bold">Switch</h1>
        <Breadcrumb
          items={[
            {
              label: "Switch Merk",
              to: "/switchMerk",
            },
            {
              label: controller?.merk?.name || "Merk",
              to: `/switchMerk/${controller?.merk?.id}`,
            },
            {
              label: controller?.ip || "Controller",
            },
            {
              label: "Switch List",
            },
          ]}
        />
        <div className="bg-white rounded-lg shadow p-5">
          <SwitchTable />
        </div>
      </div>
    </div>
  );
};

export default SwitchList;
