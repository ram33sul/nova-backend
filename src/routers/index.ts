import { Router } from "express";
import unauthorizedRouter from "./unauthorized";
import { do_auth } from "../auth/do_auth";
import authorizedRouter from "./authorized";

const router = Router();

router.use("/authorized", do_auth, authorizedRouter);

router.use("/unauthorized", unauthorizedRouter);

export default router;
