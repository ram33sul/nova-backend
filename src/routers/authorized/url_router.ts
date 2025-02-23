import { Router } from "express";
import urlController from "../../controllers/authorized/url_controller";

const router = Router();

router.use("/", urlController);

const urlRouter = router;
export default urlRouter;
