import { Router } from "express";
import { signin, signup } from "../../handler/auth_handler";
const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);

export default router;
