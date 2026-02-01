import express from "express";
// import { create, getAll} from "../../controllers/ai/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ info: "Welcome to AI" });
});


export default router;