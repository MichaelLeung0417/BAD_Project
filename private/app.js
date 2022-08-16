const socket = io.connect();

document.querySelector(".eatButton").addEventListener("click", () => {
  socket.emit("eat", true);
});

document.querySelector(".arButton").addEventListener("click", () => {
  socket.emit("AR", true);
});

document.querySelector(".talkButton").addEventListener("click", () => {
  socket.emit("talk", true);
});
