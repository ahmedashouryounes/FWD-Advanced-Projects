import { Router } from 'express';
import {
    create,
    getMany,
    getOne,
    update,
    remove,
} from '../../handler/order_products_handler';
import auth from '../../middelwares/auth_middelware';
import adminAuth from '../../middelwares/admin_middelware';
const router = Router();

router.route('/').post(auth, create).get(adminAuth, getMany);
router.route('/:id').get(auth, getOne).put(auth, update).delete(auth, remove);

export default router;
