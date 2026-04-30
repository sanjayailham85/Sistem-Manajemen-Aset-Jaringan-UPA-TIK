import React, { useEffect, useState } from "react";
import { getRacks } from "../../services/rackService";
import { getPhysical } from "../../services/physicalService";
import { getAllHost } from "../../services/hostService";

const RelationSelector = ({ level, form, setForm }) => {
  const [racks, setRacks] = useState([]);
  const [physicals, setPhysicals] = useState([]);
  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rackRes, physicalRes, hostRes] = await Promise.all([
          getRacks(),
          getPhysical(),
          getHost(),
        ]);

        setRacks(rackRes.data || []);
        setPhysicals(physicalRes.data || []);
        setHosts(hostRes.data || []);
      } catch (error) {
        console.error("Gagal mengambil relation data", error);
      }
    };

    fetchData();
  }, []);

  // FIX: pakai string compare biar aman
  const filteredPhysicals = physicals.filter(
    (item) => String(item.rackId) === String(form.rackId)
  );

  const filteredHosts = hosts.filter(
    (item) => String(item.physicalId) === String(form.physicalId)
  );

  // FIX: update state aman & sinkron
  const handleChange = (name, value) => {
    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (name === "rackId") {
        updated.physicalId = "";
        updated.hostId = "";
      }

      if (name === "physicalId") {
        updated.hostId = "";
      }

      return updated;
    });
  };

  return (
    <div className="space-y-4">
      <select
        value={form.rackId || ""}
        onChange={(e) => handleChange("rackId", e.target.value)}
        className="input"
      >
        <option value="">Pilih Rack</option>
        {racks.map((rack) => (
          <option key={rack.id} value={rack.id}>
            {rack.name}
          </option>
        ))}
      </select>

      {(level === "host" || level === "guest") && (
        <select
          value={form.physicalId || ""}
          onChange={(e) => handleChange("physicalId", e.target.value)}
          className="input"
          disabled={!form.rackId}
        >
          <option value="">Pilih Physical Server</option>
          {filteredPhysicals.map((physical) => (
            <option key={physical.id} value={physical.id}>
              {physical.name} ({physical.ip})
            </option>
          ))}
        </select>
      )}

      {level === "guest" && (
        <select
          value={form.hostId || ""}
          onChange={(e) => handleChange("hostId", e.target.value)}
          className="input"
          disabled={!form.physicalId}
        >
          <option value="">Pilih Host</option>
          {filteredHosts.map((host) => (
            <option key={host.id} value={host.id}>
              {host.name} ({host.ip})
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default RelationSelector;
