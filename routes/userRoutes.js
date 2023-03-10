import express from "express";
import {
  getUsers,
  login,
  register,
  updateUserProfile,
  getPublicBoard,
  getAdminBoard,
} from "../controllers/userController.js";
import subscriberRouter from "./subscriberRoutes.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", protect, admin, getUsers);
router.put("/", protect, updateUserProfile);
router.get("/all", getPublicBoard);

router.use("/subscriber", protect, subscriberRouter);

// router.get('/business',protect,getBusinessBoard);
router.get("/admin", protect, admin, getAdminBoard);
export default router;
