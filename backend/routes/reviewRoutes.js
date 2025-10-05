import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/:bookId", protect, addReview); 
router.put("/:id", protect, updateReview); 
router.delete("/:id", protect, deleteReview); 

export default router;
