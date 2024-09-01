import express from "express";
import { addViews, answerToQuestion, createQuiz, getQuizQuestions, quizDetails, trendingQuiz } from "../controllers/quiz.controller.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Quiz Route!");
});

router.post("/create", verifyAuth, createQuiz);
router.get("/trending", verifyAuth, trendingQuiz);
router.get("/details/:quizId", verifyAuth, quizDetails);
router.get("/:quizId", getQuizQuestions);
router.patch("/addView/:quizId", addViews);
router.patch("/answer/:quizId", answerToQuestion);

export default router;