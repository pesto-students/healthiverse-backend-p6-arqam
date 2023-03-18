import express from "express";

import {
  createSubscriberProfile,
  getSubscriberProfile,
  buyMembership,
  getAllMembership,
} from "../controllers/subscriberController.js";

const subscriberRouter = express.Router();

subscriberRouter.get("/", getSubscriberProfile);
subscriberRouter.get("/allmemberships", getAllMembership);

subscriberRouter.post("/", createSubscriberProfile);

subscriberRouter.post("/buy", buyMembership);

export default subscriberRouter;
