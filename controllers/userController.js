import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Business from "../models/businessModel.js";
import Subscriber from "../models/subscriberModel.js";

//@desc     Auth User & Get Token
//@route    POST api/users/login
//@access   Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return user ? res.status(401).json({ message: "Invalid Password" }):res.status(401).json({ message: "Email is not registered" });
    // throw new Error('Invalid email or Password');
  }
});

//@desc     REGISTER User & Get Token
//@route    POST api/users/register
//@access   Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    //rather than throwing an error, return error message
    return res.status(400).json({ message: "Email already exists" });
    // throw new Error('User already Exist');
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).json({ message: "Invalid User Data" });
    // throw new Error('Invalid User Data');
  }
});

//@desc     Get all Users
//@route    GET api/users
//@access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc     Update User Profile
//@route    PUT api/users/profile/:id
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

const getBusiness = asyncHandler(async (req, res) => {
  try {
    const businesses = await Business.find();

    return res.json(businesses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


const getAdminBoard = asyncHandler(async (req, res) => {
  res.status(200).send("Admin Board Content");
});

export {
  login,
  register,
  getUsers,
  updateUserProfile,
  getBusiness,
  getAdminBoard
};
