import Router from "express";
import { createShortUrl, deleteShortUrl, redirectUrl } from "../controller/url.controller";

const router = Router();

router.post("/api/v1/urls", createShortUrl);
router.get("/:shortCode", redirectUrl);
router.delete("/api/v1/urls/:shortCode", deleteShortUrl);

export default router;

