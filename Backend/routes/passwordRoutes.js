import express from "express";
import Password from "../models/Password.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// CREATE password
router.post("/", async (req, res) => {
  try {
    const { site, username, password } = req.body;
    const saved = await Password.create({ site, username, password });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to save password" });
  }
});

// READ all passwords
router.get("/", async (req, res) => {
  try {
    const data = await Password.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch passwords" });
  }
});

// UPDATE password
router.put("/:id", async (req, res) => {
  try {
    const { site, username } = req.body;

    const updated = await Password.findByIdAndUpdate(
      req.params.id,
      { site, username },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update password" });
  }
});

// DELETE password
router.delete("/:id", async (req, res) => {
  try {
    await Password.findByIdAndDelete(req.params.id);
    res.json({ message: "Password deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete password" });
  }
});

export default router;
