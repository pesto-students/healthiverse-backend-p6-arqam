import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    messages: [
      {
        name: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        senderType: {
          type: String,
          required: true,
        },
        receiverId: {
          type: String,
          required: true,
        },
        __createdTime__: {
          type: Number,
          required: true,
        },
      },
    ],
    
    roomId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const Chat = mongoose.model("Chat", chatSchema);
export default Chat;