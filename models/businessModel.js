import mongoose from "mongoose";
const { Schema } = mongoose;
import User from "../models/userModel.js";

const businessSchema = new mongoose.Schema(
  {
    _id: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    about: {
      type: String,
    },

    address: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    userimage: {
      Type: String,
    },
  },
  { timestamps: true }
);

const BusinessProfile = mongoose.model("Business", businessSchema);
export default BusinessProfile;
