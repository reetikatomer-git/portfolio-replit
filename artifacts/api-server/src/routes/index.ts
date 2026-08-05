import { Router, type IRouter } from "express";
import healthRouter from "./health";
import queriesRouter from "./queries";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(queriesRouter);
router.use(adminRouter);

export default router;
