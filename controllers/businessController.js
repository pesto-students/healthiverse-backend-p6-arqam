// import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
// import generateToken from '../utils/generateToken.js';


const getBusinessBoard = asyncHandler(async (req,res)=>{
  res.status(200).send("Business Board Content");
});

const getClients = asyncHandler(async (req,res)=>{
  res.status(200).send("List of clients");
});

export { getBusinessBoard, getClients};
