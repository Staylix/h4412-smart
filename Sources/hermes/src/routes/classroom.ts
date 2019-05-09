import express from 'express';
const router = express.Router();

import {auth} from '../middleware/auth';
import {authProf} from '../middleware/authProf';
import * as classroomController from '../controllers/classroom';

// BUSINESS LOGIC API
router.post('/addUserToClass/:id', authProf, classroomController.addUserToClass);
router.post('/addTourToClass', authProf, classroomController.addTourToClass);
router.get('/getClassroomOfUser', auth, classroomController.getClassroomOfUser);
router.get('/getUsersOfClassroom/:idClassroom', auth, classroomController.getUsersOfClassroom);
router.get('/getValidationRateOfATour', auth, classroomController.getValidationRateOfATour);

// BASIC API
router.post('/', auth, classroomController.createClassroom); 
router.get('/', auth,  classroomController.getAllClassroom);
router.post('/:id', auth, classroomController.getClassroomById);
router.put('/:id', auth, classroomController.modifyClassroomById);
router.delete('/:id', auth, classroomController.deleteClassroomById);



export default router;