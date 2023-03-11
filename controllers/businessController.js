import Business from "../models/businessModel.js";
import asyncHandler from "express-async-handler";

const createBusinessProfile = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { _id } = req.user;
  const profile = await Business.updateOne(
    { _id: _id },
    { ...req.body },
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
    console.log(businessProfile);
    const profile = {
      _id: _id,
      about: businessProfile.about,
      address: businessProfile.address,
      contact: businessProfile.contact,
      activities: businessProfile.activities,
      openTime: businessProfile.openTime,
      membership: businessProfile.membership,
    };
    return res.status(200).json(profile);
  }
});

const getClients = asyncHandler(async (req, res) => {
  res.status(200).send("List of clients");
});
//my comment
export { createBusinessProfile, getBusinessProfile, getClients };
