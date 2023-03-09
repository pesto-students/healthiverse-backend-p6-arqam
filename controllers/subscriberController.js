import asyncHandler from 'express-async-handler';
import Profile from '../models/profileModel';


const getSubscriberBoard = asyncHandler(async (req,res)=>{
  res.status(200).send("Subscriber Board Content");
});


const getGyms = asyncHandler(async (req,res)=>{
  res.status(200).send("List of gyms");
});


export { getSubscriberBoard, getGyms};