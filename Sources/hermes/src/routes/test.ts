import express from 'express';
const router = express.Router();

import {auth} from '../middleware/auth';
import * as testController from '../controllers/test';

router.post('/findUser/:id', auth, testController.findUserId);
router.get('/isearch/:imageName', auth, testController.getImageFromName);

export default router;
