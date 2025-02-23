import { Router } from "express";
import controller from "../controller";
import { getMe, postLogout } from "../../services/user_service";

const router = Router();

router.get("/me", controller(getMe));

router.post("/logout", controller(postLogout));

const userController = router;
export default userController;
