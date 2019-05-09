import express from 'express';
const router = express.Router();

import {auth} from '../middleware/auth';
import * as quizzController from '../controllers/quizz';

/* API for Business Logic of Quizz */

/* API for CRUD Logic of Quizzs */
router.post('/', auth, quizzController.createQuizz);
router.put('/:id', auth, quizzController.modifyQuizzById);
router.delete('/:id', auth, quizzController.deleteQuizzById);
router.get('/:id', auth, quizzController.getQuizzById);
router.get('/', auth, quizzController.getAllQuizzs);

export default router;