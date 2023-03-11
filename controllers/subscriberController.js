import asyncHandler from "express-async-handler";
import Subscriber from "../models/subscriberModel.js";
import Business from "../models/businessModel.js";
import mongoose from "mongoose";

// const getSubscriberBoard = asyncHandler(async (req, res) => {
//   res.status(200).send("Subscriber Board Content");
// });

const getGyms = asyncHandler(async (req, res) => {
  res.status(200).send("List of gyms");
});

const createSubscriberProfile = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { _id, name } = req.user;
  const subscriberProfile = await Subscriber.updateOne(
    { _id: _id },
    { ...req.body, _id: _id, name: name},
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
  const subscriberProfile = await Subscriber.findOne({ _id: _id });
  if (subscriberProfile) {
    console.log(subscriberProfile);
    const profile = {
      _id: subscriberProfile._id,
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
  // const businessID = req.params.id;
  const { id, endDate } = req.body;
  const businessID = mongoose.Types.ObjectId(id);
  const subscriberID = req.user._id;
  console.log(req.body);
  const subscriber = await Subscriber.findOne({ _id: subscriberID });
  const business = await Business.findOne({ _id: businessID });
  console.log(subscriber);
  console.log(business);
  if (subscriber && business) {
    subscriber.membership.push({
      businessID: businessID,
      endDate: endDate,
    });
    business.clients.push({
      subscriberID: subscriberID,
      endDate: endDate,
    });
    const updatedSubsciber = await subscriber.save();
    await business.save();
    res.send(200).json({ message: updatedSubsciber.membership });
  } else {
    res.status(400).send("Subscriber not found");
  }
});

export {
  getGyms,
  createSubscriberProfile,
  getSubscriberProfile,
  buyMembership,
};
