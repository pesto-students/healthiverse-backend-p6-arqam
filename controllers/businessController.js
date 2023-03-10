import Business from "../models/businessModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const createBusinessProfile = asyncHandler(async (req, res) => {
  console.log(req.body);
  const email=req.body.email;
  const { _id } = await User.findOne({ email });

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
export { createBusinessProfile };
