import express from "express";
import { verifyAuth } from "../middleware/verifyAuth.js";
import { getUserInfo, getUserQuizzes } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("User Route!");
})

router.get("/info/:userId", verifyAuth, getUserQuizzes);

export default router;