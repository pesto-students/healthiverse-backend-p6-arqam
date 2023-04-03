import asyncHandler from "express-async-handler";
import Subscriber from "../models/subscriberModel.js";
import Business from "../models/businessModel.js";
import Chat from "../models/chats.js";
import mongoose from "mongoose";

const createSubscriberProfile = asyncHandler(async (req, res) => {
  const { _id, name, email } = req.user;
  console.log(req.user);
  console.log(req.body);
  const subscriberProfile = await Subscriber.updateOne(
    { s_id: _id },
    { ...req.body, s_id: _id, name, email },
    { upsert: true }
  );
  if (subscriberProfile) {
    res.status(200).json({ data: req.body });
  } else {
    res.status(400).send("Unable to create subscriber profile");
  }
});

const getSubscriberProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const subscriberProfile = await Subscriber.findOne({ s_id: _id });
  if (subscriberProfile) {
    const profile = {
      about: subscriberProfile.about,
      height: subscriberProfile.height,
      weight: subscriberProfile.weight,
      lifestyle: subscriberProfile.lifestyle,
      goals: subscriberProfile.goals,
      mode: subscriberProfile.mode,
      userImage: subscriberProfile.userImage
    };
    return res.status(200).json(profile);
  }
  return res.status(400).send("Profile not found");
});

const buyMembership = asyncHandler(async (req, res) => {
  const { id, endDate, businessType } = req.body;
  const businessId = mongoose.Types.ObjectId(id);
  const subscriberID = req.user._id;

  const subscriber = await Subscriber.findOne({ s_id: subscriberID });
  const business = await Business.findOne({ _id: businessId });
 
  if (subscriber && business) {
    subscriber.membership.push({
      businessId: businessId,
      endDate: endDate,
      businessType: businessType 
    });
    console.log(subscriber.membership);
    const updatedSubsciber = await subscriber.save();

    res.status(200).json({ message: "Success" });
  } else {
    res.status(400).json({message: "Subscriber not found"});
  }
});

const getAllMembership = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const subscriber = await Subscriber.findOne({ s_id: _id });
    const memberships = subscriber.membership;
    return res.json(memberships);
  } catch (error) {
    res.status(500).json({message: "Server error"});
  }
});

const getSubscriberChats = asyncHandler(async (req, res) => {
  console.log("Hi");
  const {_id} = req.user;
  console.log(_id);
  const chats = await Chat.find({"roomId" : {$regex:_id}})
    .sort({updatedAt: -1});
  console.log(chats);
  const chatHistory = [];
  const businesses = [];
  for(const chat of chats){
    const messages = chat.messages;
    const lastMessage = messages[messages.length-1];
    const subscriberId = chat.roomId.split('+')[0];
    const businessId = chat.roomId.split('+')[1];
    console.log(businessId);
    if(_id==subscriberId){
      const business = await Business.findOne({_id : businessId});
        businesses.push(business);
      chatHistory.push(lastMessage);
     }
  }
  const chatHistoryWithBusinesses = [];
  const businessResponses = await Promise.all(businesses);
  // console.log(subscriberResponses);
  for(let i=0; i<businessResponses.length; i++){
      const business = businessResponses[i];
    const lastMessage = chatHistory[i];
    chatHistoryWithBusinesses.push({business, lastMessage});
  }
  console.log(chatHistoryWithBusinesses);
  if(chatHistory){
    res.status(200).json(chatHistoryWithBusinesses);
  }else{
    res.status(400).json({message: "Chat history not found"});
  }
});

const postReview = asyncHandler(async (req,res)=>{
  const {_id} = req.user;
  console.log(req.body);
  const {businessId, rating, comment} = req.body;
  const review = {
      subscriberId: _id,
      rating: rating,
      comment: comment
    }
  const business = await Business.findOne({_id: businessId});
  console.log(business);
  const existingReview = business.reviews.filter(r=>r.subscriberId==_id)[0];
  console.log(`Existing review : ${existingReview}`);
  if(!existingReview){
    const totalReviews = business.reviews.length;
    const oldAverageRating = business.averageRating?business.averageRating:0;
    const oldSum = (oldAverageRating)*(totalReviews);
    const newSum = oldSum + Number(rating);
    const newAverageRating = newSum/(totalReviews+1);
    business.averageRating = Number(newAverageRating);
    business.reviews.push(review);
  }else{
    const totalReviews = business.reviews.length;
    const oldAverageRating = business.averageRating;
    const oldSum = (oldAverageRating)*(totalReviews);
    const newSum = oldSum - existingReview.rating + rating;
    const newAverageRating = newSum/(totalReviews);
    business.averageRating = Number(newAverageRating);
    const index = business.reviews.indexOf(existingReview);
    business.reviews[index] = review;
  }
  const updatedBusiness = await business.save();
  console.log(updatedBusiness);
  if(updatedBusiness){
    res.status(200).json({message: "Review posted"});
  }else{
    res.status(400).json({message: "Error in posting review"});
  }
});

const deleteReview = asyncHandler(async(req,res)=>{
  const {_id} = req.user;
  const {businessId} = req.body;
  const business = await Business.findOne({_id: businessId});
  console.log(business);
  const index = business.reviews.findIndex((r)=>r.subscriberId==_id);
  console.log(index);
  if (index > -1) { // only splice array when item is found
    business.reviews.splice(index, 1); // 2nd parameter means remove one item only
  }
  const updatedBusiness = await business.save();
  console.log(updatedBusiness);
  if(updatedBusiness){
    res.status(200).json({message: "Review deleted"});
  }else{
    res.status(400).json({message: "Error in deleting review"});
  }
})

export {
  createSubscriberProfile,
  getSubscriberProfile,
  buyMembership,
  getAllMembership,
  getSubscriberChats,
  postReview,
  deleteReview
};
