import express from 'express';
import { getAllUsers, getUsersCount } from '../controllers/userController.js';

const router = express.Router();

router.get('/Users', getAllUsers);
router.get('/users/count', getUsersCount);

export default router;
