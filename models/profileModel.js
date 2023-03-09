import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
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
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);



const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
