import { Router } from "express";
import controller from "../controller";
import { getSignedUrl } from "../../services/aws_service";
import { validator } from "../../validators/validator";
import { urlValidator } from "../../validators/authorized/url_validator";

const router = Router();

router.get(
  "/signed-url",
  validator(urlValidator.GET["/signed-url"]),
  controller(getSignedUrl)
);

const urlController = router;
export default urlController;
