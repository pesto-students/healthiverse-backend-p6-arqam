import Message from "../models/messages";

const saveMessage = async (data) => {
  try {
    const message = await Message.create(data);
    return message;
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
};

const getMessages = async (room) => {
  try {
    const messages = await Message.find({ room: room })
      .sort({ __createdTime__: 1 })
      .limit(50);
    return messages;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export { getMessages, saveMessage };
