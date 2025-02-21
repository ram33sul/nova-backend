import { Router } from "express";
import controller from "../controller";
import { getKycList, postKyc, putKycStatus } from "../../services/kyc_service";
import { validateRole } from "../../auth/validate_role";
import { RoleName } from "../../types/role";

const router = Router();

router.post("/", controller(postKyc));

router.put("/status", validateRole([RoleName.ADMIN]), controller(putKycStatus));

router.get("/list", validateRole([RoleName.ADMIN]), controller(getKycList));

const kycController = router;
export default kycController;
