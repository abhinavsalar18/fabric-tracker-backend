import {Router} from "express"
import { addData, getAllData } from "../controllers/details.controller.js";

const router = Router();

router.route("/addData").post(addData);
router.route("/getAllData").get(getAllData);

export default router;