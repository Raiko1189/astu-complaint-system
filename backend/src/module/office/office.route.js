import { Router } from 'express';
import {
    getAllOffices,
    createOffice,
    updateOffice,
    deleteOffice
} from './office.controller.js';
import { protect, authorize } from '../../middlewares/auth.middleware.js';

const router = Router();

router.route('/')
    .get(getAllOffices)
    .post(protect, authorize('admin'), createOffice);

router.route('/:id')
    .put(protect, authorize('admin'), updateOffice)
    .delete(protect, authorize('admin'), deleteOffice);

export default router;
