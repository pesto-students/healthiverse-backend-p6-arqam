import express from 'express';

import{
  getSubscriberBoard,
  getGyms,
  createProfile
} from '../controllers/subscriberController.js';

const subscriberRouter = express.Router();


subscriberRouter.get('/', getSubscriberBoard);
subscriberRouter.get('/browse',getGyms);

subscriberRouter.post("/", createProfile);

export default subscriberRouter;
