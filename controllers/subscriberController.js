import asyncHandler from "express-async-handler";
import Subscriber from "../models/subscriberModel.js";
import Business from "../models/businessModel.js";
import mongoose from "mongoose";

const createSubscriberProfile = asyncHandler(async (req, res) => {
  const { _id, name } = req.user;
  const subscriberProfile = await Subscriber.updateOne(
    { _id: _id },
    { ...req.body, _id: _id, name: name },
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
  const { id, endDate } = req.body;
  const businessID = mongoose.Types.ObjectId(id);
  const subscriberID = req.user._id;

  const subscriber = await Subscriber.findOne({ _id: subscriberID });
  const business = await Business.findOne({ _id: businessID });

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

const getAllMembership = asyncHandler(async (req, res) => {
  try {
    const gymBusinesses = [];
    const trainerBusinesses = [];
    const dieticianBusinesses = [];
    const { _id } = req.user;
    const subscriber = await Subscriber.findById({ _id: _id })
      .select("membership")
      .select("-_id");

    const memberships = subscriber.membership;
    let businessIds = memberships.map((membership) => membership.businessID);
    const businessIdsobj = businessIds.map(mongoose.Types.ObjectId);
    const businesses = await Business.find({
      _id: { $in: businessIdsobj },
    })
      .select("-clients")
      .select("-membership");
    businesses.forEach((business) => {
      const memberarray = memberships.find(
        (m) => m.businessID === business._id.toString()
      );
      const businessWithEndDate = {
        ...business._doc,
        enddate: memberarray.endDate,
      };

      if (business.businessType === "gym") {
        gymBusinesses.push(businessWithEndDate);
      } else if (business.businessType === "trainer") {
        trainerBusinesses.push(businessWithEndDate);
      } else if (business.businessType === "dietician") {
        dieticianBusinesses.push(businessWithEndDate);
      }
    });
    const response = {
      gym: gymBusinesses,
      trainer: trainerBusinesses,
      dietician: dieticianBusinesses,
    };
    return res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export {
  createSubscriberProfile,
  getSubscriberProfile,
  buyMembership,
  getAllMembership,
};
