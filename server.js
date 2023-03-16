import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./db.js";
import cors from "cors";
dotenv.config();

import userRoutes from "./routes/userRoutes.js";

connectDb();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
const PORT = process.env.PORT;
const server = app.listen(PORT, () =>
  console.log(`Server is Running on Port ${PORT}`)
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3004",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log(data);
    const { name, room } = data;
    // allUsers.push({ id: socket.id, name, room });
    socket.join(room);

    let __createdTime__ = Date.now();

    //Send a message to all users currently in the room
    socket.to(room).emit("receive_message", {
      message: `${name} has choined the chat room`,
      name: CHAT_BOT,
      __createdTime__,
    });

    //Send welcome message to the user that just joined
    socket.emit("receive_message", {
      message: `Welcome ${name}`,
      name: CHAT_BOT,
      __createdTime__,
    });

    //Send an array of all users in the room
    // chatRoomUsres = allUsers.filter((user) => user.room === room);
    // socket.to(room).emit("chatroom_users", chatRoomUsres);
    // socket.emit("chatroom_users", chatRoomUsres);

    //get message history
    // getMessages(room).then((messages)=>{
    //   socket.emit("last_50_messages", messages);
    // });
  });

});

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
