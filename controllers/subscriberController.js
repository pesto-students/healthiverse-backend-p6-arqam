// import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
// import generateToken from '../utils/generateToken.js';


const getSubscriberBoard = asyncHandler(async (req,res)=>{
  res.status(200).send("Subscriber Board Content");
});


const getGyms = asyncHandler(async (req,res)=>{
  res.status(200).send("List of gyms");
});

export { getSubscriberBoard, getGyms};