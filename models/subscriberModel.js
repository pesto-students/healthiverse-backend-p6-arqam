import mongoose from "mongoose";
const { Schema } = mongoose;

const subscriberSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
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
        businessID: String,
        endDate: Date,
      },
    ],
    userimage: {
      Type: String,
    },
  },
  { timestamps: true }
);

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
export default Subscriber;
