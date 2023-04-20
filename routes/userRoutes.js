import express from "express";
import {
  getUsers,
  login,
  register,
  updateUserProfile,
  getBusiness,
  getAdminBoard
} from "../controllers/userController.js";
import subscriberRouter from "./subscriberRoutes.js";
import businessRouter from "./businessRoutes.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", protect, admin, getUsers);
router.put("/update", protect, updateUserProfile);
router.get("/getbusiness", getBusiness);

router.use("/subscriber", protect, subscriberRouter);

router.use("/business", protect, businessRouter);
router.get("/admin", protect, admin, getAdminBoard);
export default router;
