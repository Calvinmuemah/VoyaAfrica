import express from 'express';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/Users', getAllUsers);

export default router;
