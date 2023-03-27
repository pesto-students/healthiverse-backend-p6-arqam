import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    name: {
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
    roomId: {
      type: String,
      required: true,
    },
    __createdTime__: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);



const Message = mongoose.model("Message", messageSchema);
export default Message;