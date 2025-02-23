import { Router } from "express";
import controller from "../controller";
import {
  getKycList,
  getKycReport,
  getKycUser,
  postKyc,
  putKycStatus,
} from "../../services/kyc_service";
import { validateRole } from "../../auth/validate_role";
import { RoleName } from "../../types/role";
import { validator } from "../../validators/validator";
import { kycValidator } from "../../validators/authorized/kyc_validator";

const router = Router();

router.post("/", validator(kycValidator.POST["/"]), controller(postKyc));

router.put(
  "/status",
  validateRole([RoleName.ADMIN]),
  validator(kycValidator.PUT["/status"]),
  controller(putKycStatus)
);

router.get(
  "/list",
  validateRole([RoleName.ADMIN]),
  validator(kycValidator.GET["/list"]),
  controller(getKycList)
);

router.get("/user", controller(getKycUser));

router.get("/report", validateRole([RoleName.ADMIN]), controller(getKycReport));

const kycController = router;
export default kycController;
