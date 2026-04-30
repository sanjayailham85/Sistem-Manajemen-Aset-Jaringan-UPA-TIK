import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CCTVTable from "../../../components/tables/CCTVTable";
import Breadcrumb from "../../../components/common/Breadcrumb";
import { getById } from "../../../services/cctvControllerService";

const CCTVList = () => {
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
        <h1 className="text-2xl font-bold">CCTV</h1>
        <Breadcrumb
          items={[
            {
              label: "CCTV Merk",
              to: "/cctvMerk",
            },
            {
              label: controller?.merk?.name || "Merk",
              to: `/cctvMerk/${controller?.merk?.id}`,
            },
            {
              label: controller?.ip || "Controller",
            },
            {
              label: "CCTV List",
            },
          ]}
        />
        <div className="bg-white rounded-lg shadow p-5">
          <CCTVTable />
        </div>
      </div>
    </div>
  );
};

export default CCTVList;
