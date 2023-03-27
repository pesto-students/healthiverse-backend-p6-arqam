import Message from "../models/messages.js";

const createRoom = async (roomId) => {
  try {
    const chat = await Chat.create({ roomId: roomId });
    return chat;
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
};

const saveMessage = async (data) => {
  try {
    const { roomId } = data;
    const message = {
      name: data.name,
      message: data.message,
      senderType: data.senderType,
      receiverId: data.receiverId,
      __createdTime__: data.__createdTime__,
    };
    const chat = await Chat.findOne({ roomId: roomId });
    chat.messages.push(message);
    const updatedChat = await chat.save();
    return updatedChat;
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
};


const getMessages = async (roomId) => {
  try {
    const chat = await Chat.findOne({ roomId: roomId });
    const allMessages = chat.messages;
    const last50 = allMessages.slice(-50);
    return last50;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export {createRoom, getMessages, saveMessage };
