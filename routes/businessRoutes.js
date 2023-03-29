import express from "express";
import {
  createBusinessProfile,
  getBusinessProfile,
  getClients,
  editBusinessProfile,
  getBusinessChats
} from "../controllers/businessController.js";
const businessRouter = express.Router();

businessRouter.post("/", createBusinessProfile);
businessRouter.post("/edit", editBusinessProfile);
businessRouter.get("/", getBusinessProfile);
businessRouter.get("/clients", getClients);

businessRouter.get("/chats", getBusinessChats);

export default businessRouter;
