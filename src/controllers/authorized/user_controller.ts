import { Router } from "express";
import controller from "../controller";
import { getMe, postLogout } from "../../services/user_service";
import { validator } from "../../validators/validator";
import { userValidator } from "../../validators/authorized/user_validator";

const router = Router();

router.get("/me", validator(userValidator.GET["/me"]), controller(getMe));

router.post("/logout", controller(postLogout));

const userController = router;
export default userController;
