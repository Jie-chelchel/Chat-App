const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;
const publicDirectoryPath = path.join(__dirname, "../public");
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
app.use(express.static(publicDirectoryPath));

let count = 0;

io.on("connection", (socket) => {
  console.log("new webSockets connection");
  socket.emit("countUpdated", count);
  socket.on("increment", () => {
    count += 1;
    //socket.emit("countUpdated", count);
    io.emit("countUpdated", count);
  });
});

server.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});
