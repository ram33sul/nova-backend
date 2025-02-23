import { Router } from "express";
import controller from "../controller";
import { getSignedUrl } from "../../services/aws_service";

const router = Router();

router.get("/signed-url", controller(getSignedUrl));

const urlController = router;
export default urlController;
