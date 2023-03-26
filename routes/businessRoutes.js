import express from "express";
import {
  createBusinessProfile,
  getBusinessProfile,
  getClients,
  editBusinessProfile
} from "../controllers/businessController.js";
const businessRouter = express.Router();

businessRouter.post("/", createBusinessProfile);
businessRouter.post("/edit", editBusinessProfile);
businessRouter.get("/", getBusinessProfile);
businessRouter.get("/clients", getClients);

export default businessRouter;
