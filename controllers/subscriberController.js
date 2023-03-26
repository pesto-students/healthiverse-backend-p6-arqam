import asyncHandler from "express-async-handler";
import Subscriber from "../models/subscriberModel.js";
import Business from "../models/businessModel.js";
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

export {
  createSubscriberProfile,
  getSubscriberProfile,
  buyMembership,
  getAllMembership,
};
