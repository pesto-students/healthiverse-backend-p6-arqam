import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

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
    senderRole: {
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

messageSchema.methods.matchRoomId = function (enteredRoomId) {
  return bcrypt.compare(enteredRoomId, this.roomId);
};

messageSchema.pre('save', async function (next) {
  if (!this.isModified('roomId')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.roomId = await bcrypt.hash(this.roomId, salt);
});

const Message = mongoose.model("Message", messageSchema);
export default Message;