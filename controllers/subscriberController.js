import asyncHandler from 'express-async-handler';
import Profile from '../models/profileModel.js';


const getSubscriberBoard = asyncHandler(async (req,res)=>{
  res.status(200).send("Subscriber Board Content");
});


const getGyms = asyncHandler(async (req,res)=>{
  res.status(200).send("List of gyms");
});

const createProfile = asyncHandler(async (req,res)=>{
  console.log(req.body);
  const { _id } = req.body;
  const profile = await Profile.updateOne({_id: _id},{...req.body},{upsert: true});
  if (profile){
    res.status(200).send("Profile created");
  }else{
    res.status(400).send("Unable to create profile");
  }
})


export { getSubscriberBoard, getGyms, createProfile};