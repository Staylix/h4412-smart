import express from 'express';
const router = express.Router();

import {auth} from '../middleware/auth';
import * as stepController from '../controllers/step';


/* API for Business Logic of Steps */
router.get('/studentHasValidated/:id', auth, stepController.hasAStudentValidatedStep);
router.get('/validateAStep/:id', auth, stepController.validateAStep);
router.post('/answerAQuizz', auth, stepController.answerAQuizz);

/* API for CRUD Logic of Steps */
router.post('/', auth, stepController.createStep);
router.put('/:id', auth, stepController.modifyStepById);
router.delete('/:id', auth, stepController.deleteStepById);
router.get('/:id', auth, stepController.getStepById);
router.get('/', auth, stepController.getAllSteps);



export default router;
