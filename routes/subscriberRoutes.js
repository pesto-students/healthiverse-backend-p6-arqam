import express from "express";

import {
  getGyms,
  createSubscriberProfile,
  getSubscriberProfile,
  buyMembership,
} from "../controllers/subscriberController.js";

const subscriberRouter = express.Router();

subscriberRouter.get("/", getSubscriberProfile);
subscriberRouter.get("/browse", getGyms);

subscriberRouter.post("/", createSubscriberProfile);

subscriberRouter.post("/buy", buyMembership);

export default subscriberRouter;
