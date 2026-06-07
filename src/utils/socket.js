import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("SOCKET CONNECTED", socket.id);
});

socket.on("connect_error", (err) => {
  console.log("SOCKET ERROR", err.message);
});

socket.on("disconnect", (reason) => {
  console.log("SOCKET DISCONNECTED", reason);
});
