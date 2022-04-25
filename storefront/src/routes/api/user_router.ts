import { Router } from 'express';
import { getMany, getOne, update, remove } from '../../handler/user_handler';
import auth from '../../middelwares/auth_middelware';
import adminAuth from '../../middelwares/admin_middelware';
const router = Router();

router.get('/', adminAuth, getMany);
router.route('/:id').get(auth, getOne).put(auth, update).delete(auth, remove);

export default router;
