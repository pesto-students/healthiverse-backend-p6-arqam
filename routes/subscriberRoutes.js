import express from "express";

import {
  getSubscriberBoard,
  getGyms,
  createSubscriber,
} from "../controllers/subscriberController.js";

const subscriberRouter = express.Router();

subscriberRouter.get("/", getSubscriberBoard);
subscriberRouter.get("/browse", getGyms);

subscriberRouter.post("/", createSubscriber);

export default subscriberRouter;
