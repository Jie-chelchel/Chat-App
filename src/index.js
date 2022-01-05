const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;
const publicDirectoryPath = path.join(__dirname, "../public");
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const Filter = require("bad-words");
const { generateMessage } = require("./utils/messages");
app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  socket.emit("message", generateMessage("Welcome"));

  socket.broadcast.emit("message", generateMessage("A new user has joined"));

  socket.on("sendMessage", (msg, callback) => {
    const filter = new Filter();

    if (filter.isProfane(msg)) {
      return callback("Profanity is not allowed");
    }

    io.emit("message", generateMessage(msg));
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("message", generateMessage(" A user has left"));
  });

  socket.on("sendLocation", (location, callback) => {
    io.emit(
      "sendLocationMessage",
      `https://google.com/maps?q=${location.latitude},${location.longitude}`
    );
    callback();
  });
});

server.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});
