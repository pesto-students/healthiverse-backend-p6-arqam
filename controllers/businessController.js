import Business from "../models/businessModel.js";
import Subscriber from "../models/subscriberModel.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

const createBusinessProfile = asyncHandler(async (req, res) => {
  const { _id, name } = req.user;
  const profile = await Business.updateOne(
    { _id: _id },
    { ...req.body, _id: _id, name: name },
    { upsert: true }
  );
  if (profile) {
    res.status(200).send("Business Profile created");
  } else {
    res.status(400).send("Unable to create profile");
  }
});

const getBusinessProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const businessProfile = await Business.findOne({ _id: _id });
  if (businessProfile) {
    const profile = {
      _id: _id,
      businessType: businessProfile.businessType,
      about: businessProfile.about,
      address: businessProfile.address,
      contact: businessProfile.contact,
      activities: businessProfile.activities,
      openTime: businessProfile.openTime,
      membership: businessProfile.membership,
    };
    return res.status(200).json(profile);
  }
  res.status(400).send("Profile not found");
});

const getClients = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    console.log(_id);
    const businessID = mongoose.Types.ObjectId(_id);
    const businessone = await Business.findOne({ _id: businessID });
    const clients = [];

    for (const client of businessone.clients) {
      const subscriber = await Subscriber.findOne({ _id: client.subscriberID });

      if (subscriber) {
        clients.push({
          name: subscriber.name,
          goals: subscriber.goals,
          height: subscriber.height,
          lifestyle: subscriber.lifestyle,
          mode: subscriber.mode,
          weight: subscriber.weight,
          endDate: client.endDate,
        });
      }
    }
    console.log(clients);
    return res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
  // res.status(200).send("List of clients");
});
//my comment
export { createBusinessProfile, getBusinessProfile, getClients };
