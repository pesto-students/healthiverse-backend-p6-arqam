import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    s_id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },

    address: {
      type: String,
    },
    contact: {
      type: String,
      required: true,
    },
    businessType: {
      type: String,
      required: true,
    },
    activities: [{ type: String }],
    openTime: {
      from: {
        type: String,
      },
      to: {
        type: String,
      },
    },
    membership: {
      one: {
        type: String,
        required: true,
      },
      three: {
        type: String,
        required: true,
      },
      six: {
        type: String,
        required: true,
      },
      twelve: {
        type: String,
        required: true,
      },
    },
    reviews: [{
      subscriberId: { type: String },
      subscriberName: {type: String},
      subscriberImage: {type: String},
      rating: { type: Number },
      comment: { type: String },
    }],
    averageRating: { type: Number },
    userImage: {
      Type: String,
    },
    otherImages: [{ type: String }],
  },
  { timestamps: true }
);

const Business = mongoose.model("Business", businessSchema);
export default Business;
