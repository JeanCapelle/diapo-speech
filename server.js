var io = require("socket.io")(1337);

console.log("Socket listen on port 1337 : ");

io.on("connection", socket => {
  console.log("Client connected");

  // socket.on("message", msg => {
  //   console.log(`New message : ${msg}`);
  //   socket.emit("STEP", { hello: "world" });
  // });

  socket.on("STEP", data => {
    console.log("emit new step:", data);
    io.emit("NEW_STEP", { data });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
