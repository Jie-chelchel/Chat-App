const socket = io();

// socket.on("countUpdated", (count) => {
//   console.log("The count has been updated!");
//   console.log(count);
// });

// document.querySelector("#increment").addEventListener("click", () => {
//   socket.emit("increment");
// });

socket.on("message", (message) => {
  console.log(message);
});

document.querySelector("#message-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const newMessage = document.querySelector("input").value;
  socket.emit("sendMessage", newMessage);
});
