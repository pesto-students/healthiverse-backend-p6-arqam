import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    s_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    about: {
      type: String,
    },
    height: {
      type: String,
      required: true,
    },

    weight: {
      type: String,
      required: true,
    },

    lifestyle: {
      type: String,
      required: true,
    },
    goals: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    membership: [
      {
        businessId: { type: String },
        endDate: Date,
        businessType: String
      },
    ],
    userImage: {
      Type: String,
    },
  },
  { timestamps: true }
);

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
export default Subscriber;
