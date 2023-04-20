import express from "express";

import {
  createSubscriberProfile,
  getSubscriberProfile,
  buyMembership,
  getAllMembership,
  getSubscriberChats,
  postReview,
  deleteReview
} from "../controllers/subscriberController.js";

const subscriberRouter = express.Router();

subscriberRouter.get("/", getSubscriberProfile);
subscriberRouter.get("/allmemberships", getAllMembership);
subscriberRouter.get("/chats", getSubscriberChats);

subscriberRouter.post("/", createSubscriberProfile);

subscriberRouter.post("/buy", buyMembership);
subscriberRouter.post("/review", postReview);
subscriberRouter.put("/review/delete", deleteReview);

export default subscriberRouter;
