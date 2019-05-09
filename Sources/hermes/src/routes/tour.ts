import express from 'express';
const router = express.Router();

import {auth} from '../middleware/auth';
import * as tourController from '../controllers/tour';

/* Business Logic API */
router.get('/byAuthorId/:idAuthor', auth, tourController.getAuthorTours); //maybe deprecated, use the new service instead
router.get('/withSteps/:idTour' , auth, tourController.getTourWithStep);
router.get('/getFullToursForAuthor', auth, tourController.getFullToursForAuthor); //based on token, don't need ID in params => new way of getting user id
router.get('/getToursOfAStudent', auth, tourController.getToursOfAStudent);
router.get('/getToursOfAClassroom/:idClassroom', auth, tourController.getToursOfAClassroom);

/* Basic API for CRUD */
router.post('/', auth, tourController.createTour);
router.put('/:idTour', auth, tourController.updateTour);
router.delete('/:idTour', auth, tourController.deleteTour);
router.get('/', auth, tourController.tourList);
router.get('/:idTour', auth, tourController.getTour);


export default router;
