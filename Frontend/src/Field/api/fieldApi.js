import client from "../../Api/client";

const API_BASE = "http://localhost:8000/api";

export const getDashboard = async (batchId) => {
  const { data } = await client.get(`dashboard/${batchId}`);
  return data;
};

export const connectDashboardWebSocket = (batchId, onMessage) => {
  const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
  const ws = new WebSocket(
    `${wsProtocol}://localhost:8000/api/ws/dashboard/${batchId}`
  );

  ws.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      if (onMessage) onMessage(payload);
    } catch (error) {
      console.error("Dashboard websocket parse error:", error);
    }
  };

  ws.onopen = () => {
    ws.send("ping");
  };

  ws.onerror = () => {
    console.warn(
      `WebSocket connection error (${API_BASE}/ws/dashboard/${batchId})`
    );
  };

  return ws;
};
