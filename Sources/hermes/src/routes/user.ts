import express from 'express';
const router = express.Router();

import {auth} from '../middleware/auth';
import {authProf} from '../middleware/authProf';
import * as userController from '../controllers/user';

/*Business Logic for Users */
router.get('/studentStats', authProf, userController.getStatsForStudent);

/* BASIC API CRUD for Users */
router.post('/', userController.signUp);
router.post('/login', userController.login);
router.post('/:id', auth, userController.findUserById);
router.put('/:id', auth, userController.updateUserById);
router.get('/', authProf, userController.userList);
router.get('/byMail/:email', auth, userController.findUserByMail);


export default router;
