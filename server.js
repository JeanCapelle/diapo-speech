var io = require("socket.io")(1337);

console.log("Socket listen on port 1337 : ");

io.on("connection", socket => {
  // console.log("Client connected");

  // socket.on("message", msg => {
  //   console.log(`New message : ${msg}`);
  //   socket.emit("STEP", { hello: "world" });
  // });
  socket.on("response", data => {
    // console.log("response:", data);
    io.emit("response",  data);
  });
  socket.on("arnold", data => {
    io.emit("arnold",  data.result.fulfillment.speech);
  });
  socket.on("STEP", data => {
    io.emit("NEW_STEP",  data );
  });
  socket.on("REMOVE", data => {
    io.emit("REMOVE_ARNOLD",  data );
  });
  socket.on("bonjour", data => {
    io.emit("BONJOUR_JURY",  data );
  });
  socket.on("url", data => {
    io.emit("URL",  data );
    // console.log("open url"+ data);

  });
  socket.on("close", data => {
    io.emit("CLOSE_URL",  data );
    console.log("closed url"+ data);

  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
