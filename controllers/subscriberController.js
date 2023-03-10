import asyncHandler from 'express-async-handler';
import Subscriber from '../models/subscriberModel.js';


const getSubscriberBoard = asyncHandler(async (req,res)=>{
  res.status(200).send("Subscriber Board Content");
});


const getGyms = asyncHandler(async (req,res)=>{
  res.status(200).send("List of gyms");
});

const createSubscriber = asyncHandler(async (req,res)=>{
  console.log(req.body);
  const { _id } = req.body;
  const subscriberModel = await Subscriber.updateOne({_id: _id},{...req.body},{upsert: true});
  if (subscriberModel){
    res.status(200).send("Subscriber profile created");
  }else{
    res.status(400).send("Unable to create subscriber profile");
  }
})


export { getSubscriberBoard, getGyms, createSubscriber};