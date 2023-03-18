import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { getMessages, saveMessage } from "./controllers/messageController.js";

const socketio = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3004",
      methods: ["GET", "POST"],
    },
  });

  io.use(function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
      try {
        console.log(socket.handshake.query);
        const decoded = jwt.verify(
          socket.handshake.query.token,
          process.env.JWT_SECRET
        );
        socket.decoded = decoded;
        next();
      } catch(err) {
            console.log(err);          
      }
    }
  }).on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on("join_room", (data) => {
      const {senderRole, receiverId} = data;
      const senderId = socket.decoded.id;
      let roomId = "";
      if(senderRole==="subscriber"){
         roomId = senderId+"+"+receiverId;
      }else{
         roomId = receiverId+"+"+senderId;
      }
      
      socket.join(roomId);

      getMessages(roomId).then((messages) => {
        socket.emit("last_50_messages", messages);
      });
    });

    socket.on("send_message", (data) => {
      const {senderRole, receiverId} = data;
      const senderId = socket.decoded.id;
      let roomId = "";
      if(senderRole==="subscriber"){
         roomId = senderId+"+"+receiverId;
      }else{
         roomId = receiverId+"+"+senderId;
      }
      data.roomId = roomId;
      console.log(data);
      io.in(roomId).emit("receive_message", data);
      saveMessage(data);
    });
  });

  return io;
};

export default socketio;
