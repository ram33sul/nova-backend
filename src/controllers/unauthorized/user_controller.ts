import { Router } from "express";
import controller from "../controller";
import { postLogin, postRegister } from "../../services/user_service";
import { validator } from "../../validators/validator";
import { userValidator } from "../../validators/unauthorized/user_validator";

const router = Router();

router.post(
  "/register",
  validator(userValidator.POST["/register"]),
  controller(postRegister)
);

router.post(
  "/login",
  validator(userValidator.POST["/login"]),
  controller(postLogin)
);

const userController = router;
export default userController;
