import { Router } from "express";
import controller from "../controller";
import { postRefresh } from "../../services/auth_service";

const router = Router();

router.post("/refresh", controller(postRefresh));

const authController = router;
export default authController;
