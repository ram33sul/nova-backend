import { Router } from "express";
import kycController from "../../controllers/authorized/kyc_controller";

const router = Router();

router.use("/", kycController);

const kycRouter = router;
export default kycRouter;
