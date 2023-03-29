import Business from "../models/businessModel.js";
import Subscriber from "../models/subscriberModel.js";
import asyncHandler from "express-async-handler";
import Chat from "../models/chats.js";

const createBusinessProfile = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const s_id = req.user._id;
  await Business.create({ ...req.body, email, s_id });
  const profiles = await Business.find({ s_id: s_id });
  if (profiles) {
    res.status(200).json(profiles);
  } else {
    res.status(400).json({ message: "Unable to create profile" });
  }
});

const editBusinessProfile = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  const s_id = req.user._id;
  await Business.updateOne(
    { _id: id },
    { ...req.body }
  );
  const profiles = await Business.find({ s_id: s_id });
  if (profiles) {
    res.status(200).json(profiles);
  } else {
    res.status(400).json({ message: "Unable to create profile" });
  }
});

const getBusinessProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const businessProfile = await Business.find({ s_id: _id });
  console.log(businessProfile);
  if (businessProfile.length > 0) {
    return res.status(200).json(businessProfile);
  }
  res.status(400).send("Profile not found");
});

const getClients = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;

    const businesses = await Business.find({ s_id: _id });
    const businessIds = await businesses.map((business) => business._id);
    const allSubscribers = await Subscriber.find();
    let clients = allSubscribers.filter((subscriber) =>
      subscriber.membership.filter((m) => businessIds.includes(m.businessId))
    );
    return res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

const getBusinessChats = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const chats = await Chat.find({ "roomId": { $regex: _id } })
    .sort({ updatedAt: -1 });
  console.log(chats);
  const chatHistory = [];
  const subscribers = [];
  for (const chat of chats) {
    const messages = chat.messages;
    const lastMessage = messages[messages.length - 1];
    const subscriberId = chat.roomId.split('+')[0];
    const businessId = chat.roomId.split('+')[1];
    const parentBusinessId = chat.roomId.split('+')[2];
    console.log(_id);
    console.log(businessId);
    console.log(parentBusinessId);
    if (_id == parentBusinessId) {
      console.log("Same Ids");
      let subscriber = Subscriber.findOne({ s_id: subscriberId });
      subscribers.push(subscriber);
      chatHistory.push({ businessId, lastMessage });
    }
  }
  const chatHistoryWithSubscribers = [];
  const subscriberResponses = await Promise.all(subscribers);
  console.log(subscriberResponses);
  for(let i=0; i<subscriberResponses.length; i++){
      const subscriber = subscriberResponses[i];
    const {businessId, lastMessage} = chatHistory[i];
    chatHistoryWithSubscribers.push({subscriber, businessId, lastMessage});
  }
  console.log(chatHistoryWithSubscribers);
  if (chatHistoryWithSubscribers) {
    res.status(200).json(chatHistoryWithSubscribers);
  } else {
    res.status(400).json({ message: "Chat history not found" });
  }
})

export { createBusinessProfile, getBusinessProfile, getClients, editBusinessProfile, getBusinessChats };
