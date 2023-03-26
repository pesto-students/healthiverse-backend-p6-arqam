import Message from "../models/messages.js";

const saveMessage = async (data) => {
  try {
   
    
    const message = await Message.create(data);
    return message;
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
};

const getMessages = async (roomId) => {
  try {
    const allMessages = await Message.find({}).sort({ __createdTime__: 1 });
    const roomMessages = await allMessages.filter((message) => {
      return message.matchRoomId(roomId);
    });
    const last50 =  roomMessages.slice(-50);
    console.log(last50);
    return last50;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export { getMessages, saveMessage };
