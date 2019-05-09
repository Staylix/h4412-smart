import express from 'express';
const router = express.Router();

import {auth} from '../middleware/auth';
import * as poiController from '../controllers/poi';

/* Business logic API */
router.get('/filter/:keyword', poiController.getPoisByName);

/* CRUD API */
router.post('/:id', auth, poiController.getPoiById);
router.put('/:id', auth, poiController.modifyPoiById);
router.delete('/:id', auth, poiController.deletePoiById);
router.post('/', auth, poiController.createPoi); 
router.get('/', auth,  poiController.getAllPoi);

export default router;