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

io.on("connection", (socket) => {
  socket.emit("message", "welcome");

  socket.broadcast.emit("message", "A new user has joined");

  socket.on("sendMessage", (msg) => {
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    io.emit("message", " A user has left");
  });

  socket.on("sendLocation", (location) => {
    io.emit("message", `location: ${location.latitude},${location.longitude}`);
  });
});

server.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});
