import { Router } from "express";
import { create, getMany, getOne, update, remove } from "../../handler/product_handler";
import  auth  from "../../middelwares/auth_middelware";
import  adminAuth  from "../../middelwares/admin_middelware";
const router = Router();

router.route("/").post(adminAuth, create).get(getMany)
router.route("/:id").get(getOne).put(adminAuth, update).delete(adminAuth, remove)

export default router;
