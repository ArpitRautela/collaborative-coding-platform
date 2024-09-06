const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const ACTION = require("./src/Actions");
const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        userName: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on(ACTION.JOIN, ({ roomId, userName }) => {
    userSocketMap[socket.id] = userName;
    socket.join(roomId);

    // Get the list of connected clients in the room
    const clients = getAllConnectedClients(roomId);

    // Emit the JOINED event once to all clients in the room
    io.in(roomId).emit(ACTION.JOINED, {
      clients, // Send the updated list of clients
      userName,
      socketId: socket.id,
    });

  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
