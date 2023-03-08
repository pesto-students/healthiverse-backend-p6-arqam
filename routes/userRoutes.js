import express from 'express';
import {
  getUsers,
  login,
  register,
  updateUserProfile,
  getPublicBoard,
  getSubscriberBoard,
  getBusinessBoard
} from '../controllers/userController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', protect, admin, getUsers);
router.put('/', protect, updateUserProfile);
router.get('/all',getPublicBoard);
router.get('/subscriber', protect, getSubscriberBoard);
router.get('/business',protect,getBusinessBoard);
export default router;
