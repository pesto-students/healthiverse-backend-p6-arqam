import Chat from "../models/chats.js";

const createRoom = async (roomId) => {
  try {
    const existingChat = await Chat.findOne({roomId: roomId});
    if(!existingChat){
      return await Chat.create({ roomId: roomId });
    }
    return existingChat;
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
    const chat = await createRoom(roomId);
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
    console.log(roomId);
    const chat = await Chat.findOne({ roomId: roomId });
    const allMessages = chat.messages;
    const last50 = allMessages.slice(-50);
    return last50;
  } catch (err) {
    console.log(err);
    return [];
  }
};


export { getMessages, saveMessage };
