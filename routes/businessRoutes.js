import express from "express";
import { createBusinessProfile } from "../controllers/businessController.js";
const businessRouter = express.Router();
businessRouter.post("/", createBusinessProfile);
export default businessRouter;
