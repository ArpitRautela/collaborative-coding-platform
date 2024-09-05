const express = require('express');
const app = express();
const {server} = require('socket.io');

const http = http.createServer(app);
const io = new Server(http);

io.on('connection', (socket) => {
  console.log('a user connected');
});  

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});