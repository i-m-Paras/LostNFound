const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;
const DATABASE = process.env.DATABASE;
const port = process.env.PORT || 8080;

const errorController = require("./controllers/error");
const userController = require("./controllers/user");
const userItemController = require("./controllers/userItem");
const chatController = require("./controllers/chat");
const { Socket, Server } = require("socket.io");

app.use(express.json());
app.use(cors());
app.use("/static", express.static("static"));

app.use(bodyparser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "views");

app.post("/userLogin", userController.userLogin);
app.post("/userRegister", userController.addUser);
app.post("/contactUs", userController.addContactUs);
app.post("/adduseritem", userItemController.addUserItem);
app.get("/lostitem", userItemController.getLostItem);
app.post("/founditem", userItemController.getFoundItem);
app.post("/addfriend", chatController.addFriend);
app.post("/friendlist", chatController.friendList);
app.post("/findfriendname", chatController.findFriendName);
app.post("/deleteitem", userItemController.deteteItem);

app.use(errorController.get404);

mongoose
  .connect(`${DATABASE}`)
  .then((result) => {
    console.log("connected database!");

    const server = app.listen(port);
    const io = new Server(server, {
      cors: {
        origin: "https://lostnfound-ff87b.web.app/",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("User connected!", socket.id);

      socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined the room ${data}`);
      });

      socket.on("send_message", (data) => {
        socket.to(data.room).emit("recieve_message", data);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected!", socket.id);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
