import { Router } from "express";
import { create, getMany, getOne, update, remove } from "../../handler/user_handler";
const router = Router();

router.route("/").post(create).get(getMany)
router.route("/:id").get(getOne).put(update).delete(remove)

export default router;
