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
  const businessProfile = await Business.findOne(
    { _id: _id },
    {
      businessType: 1,
      about: 1,
      address: 1,
      contact: 1,
      activities: 1,
      membership: 1,
    }
  );
  if (businessProfile) {
    return res.status(200).json(businessProfile);
  }
  res.status(400).send("Profile not found");
});

const getClients = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;

    const businessID = mongoose.Types.ObjectId(_id);
    const subscribers = await Subscriber.find({
      "membership.businessID": businessID,
    });
    const onlySubscribers = await Subscriber.find({
      "membership.businessID": businessID,
    }).select("-membership");
    const subscriberEndDates = subscribers.map((subscriber) => ({
        ...onlySubscribers,
        ...{endDate: subscriber.membership[0].endDate,
      },
      
    }));
    

    return res.status(200).json(subscriberEndDates);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export { createBusinessProfile, getBusinessProfile, getClients };
