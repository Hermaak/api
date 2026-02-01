import express from "express";
import { create, getAll} from "../../controllers/crediinvest/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ info: "Welcome to crediinvest" });
});

router.get('/all', getAll);
router.post("/create", create);
// router.put("/update", update);
// router.delete('/remove/:id', remove);
// router.put('/remove-attr/:id', removeAttr);

export default router;