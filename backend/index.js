const express = require("express");
const connectToDB = require("./db.js");
const cors = require("cors");
const post = require("./routes/post.js");
const user = require("./routes/user.js");
const chat = require("./routes/chat.js");
const comment = require("./routes/comment.js");
const like = require("./routes/like.js");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/post", post);
app.use("/chat", chat);
app.use("/user", user);
app.use("/comment", comment);
app.use("/like", like);

io.on("connection", (socket) => {
  
  socket.on("send-msg", (data) => {
    socket.broadcast.emit("msg-received", data);
  });
});

connectToDB();

server.listen(3000, () => {
  console.log(`MadBook app listening on port 3000`);
});
