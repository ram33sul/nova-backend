import { Router } from "express";
import authRouter from "./auth_router";
import kycRouter from "./kyc_router";
import urlRouter from "./url_router";
import userRouter from "./user_router";

const router = Router();

router.use("/auth", authRouter);

router.use("/kyc", kycRouter);

router.use("/url", urlRouter);

router.use("/user", userRouter);

const authorizedRouter = router;
export default authorizedRouter;
