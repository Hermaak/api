import express from "express";
import { home, gotData } from "../../controllers/main/index.js";

const router = express.Router();

router.get("/", home);
router.post("/", gotData)

export default router;
