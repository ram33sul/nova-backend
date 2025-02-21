import { Router } from "express";
import authRouter from "./auth_router";
import kycRouter from "./kyc_router";

const router = Router();

router.use("/auth", authRouter);

router.use("/kyc", kycRouter);

const authorizedRouter = router;
export default authorizedRouter;
