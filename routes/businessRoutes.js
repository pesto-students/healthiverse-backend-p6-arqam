import express from "express";
import {
  createBusinessProfile,
  getBusinessProfile,
  getClients,
} from "../controllers/businessController.js";
const businessRouter = express.Router();

businessRouter.post("/", createBusinessProfile);
businessRouter.get("/", getBusinessProfile);
businessRouter.get("/clients", getClients);

export default businessRouter;
