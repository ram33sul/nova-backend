import { Router } from "express";
import authRouter from "./auth_router";
import { do_auth } from "../../auth/do_auth";

const router = Router();

router.use("/auth", authRouter);

const authorizedRouter = router;
export default authorizedRouter;
