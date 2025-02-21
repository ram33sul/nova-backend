import { Router } from "express";
import controller from "../controller";
import { postLogin, postRegister } from "../../services/user_service";

const router = Router();

router.post("/register", controller(postRegister));

router.post("/login", controller(postLogin));

const userController = router;
export default userController;
