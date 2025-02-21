import { Router } from "express";
import authController from "../../controllers/auth_controller";

const router = Router();

router.use("/", authController);

const authRouter = router;
export default authRouter;
