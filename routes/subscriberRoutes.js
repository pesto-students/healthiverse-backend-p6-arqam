import express from "express";

import {
  getGyms,
  createSubscriberProfile,
  getSubscriberProfile,
} from "../controllers/subscriberController.js";

const subscriberRouter = express.Router();

subscriberRouter.get("/", getSubscriberProfile);
subscriberRouter.get("/browse", getGyms);

subscriberRouter.post("/", createSubscriberProfile);

export default subscriberRouter;
