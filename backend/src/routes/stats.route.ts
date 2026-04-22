import Router from "express";
import { getStats, healthCheck, getClickDetails } from "../controller/stats.controller";


const router = Router();

router.get("/api/v1/stats/:shortCode", getStats);
router.get("/api/v1/stats/:shortCode/clicks", getClickDetails);
router.get("/api/v1/health", healthCheck);

export default router;