import {Router} from "express"
import { addData, deleteData, getAllData, updateData } from "../controllers/details.controller.js";

const router = Router();

router.route("/addData").post(addData);
router.route("/getAllData").get(getAllData);
router.route("/deleteData/:id").delete(deleteData);
router.route("/updateData/:id").put(updateData);

export default router;