import { Router } from "express";
import userController from "../../controllers/user_controller";

const router = Router();

router.use("/", userController);

const userRouter = router;
export default userRouter;
