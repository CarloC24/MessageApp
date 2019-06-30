const app = require("express")();
const cors = require("cors");
// init socket io
// note that app is still our express server
const server = require("http").Server(app);
const io = require("socket.io")(server);
// end init socket io
app.use(require("express").json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true
  })
);
const port = process.env.PORT || 5000;
let connections = [];

app.get("/", (req, res) => {
  res.send("sanity check");
});

io.on("connection", function(socket) {
  // push the socket to the connections array!
  connections.push(socket);
  console.log(`socket connected! sockets remaining : ${connections.length}`);
  socket.emit("news", { hello: "world" });
  socket.on("disconnect", function() {
    //filter it out
    const newconnections = connections.filter(
      connection => connection != socket
    );
    connections = newconnections;
    console.log(`socket disconected sockets remaining : ${connections.length}`);
  });
});

server.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
