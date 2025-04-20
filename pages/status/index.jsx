import { useState } from "react";
import useSWR from "swr";

export default function HealthCheck() {
  const [healthData, setHealthData] = useState({
    updated_at: "",
    dependencies: {
      database: {
        version: "",
        max_connections: "",
        opened_connections: "",
      },
    },
  });

  const fetchApi = async (key) => {
    const response = await fetch(key);
    const responseBody = await response.json();
    setHealthData(responseBody);
  };

  useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 className="text-3xl font-bold underline">Health Check</h1>
      <p>
        <strong>Last Updated:</strong>{" "}
        {new Date(healthData.updated_at).toLocaleString()}
      </p>
      <h2>Dependencies</h2>
      <div className="">
        <h3>Database</h3>
        <p>
          <strong>Version:</strong> {healthData.dependencies.database.version}
        </p>
        <p>
          <strong>Max Connections:</strong>{" "}
          {healthData.dependencies.database.max_connections}
        </p>
        <p>
          <strong>Opened Connections:</strong>{" "}
          {healthData.dependencies.database.opened_connections}
        </p>
      </div>
    </div>
  );
}
