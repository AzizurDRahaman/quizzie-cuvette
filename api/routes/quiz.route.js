import express from "express";
import { createQuiz } from "../controllers/quiz.controller.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Quiz Route!");
});

router.post("/create", verifyAuth, createQuiz);

export default router;