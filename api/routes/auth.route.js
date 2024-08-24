import express from "express";
import { login, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Auth Route!");
});

router.post("/sign-up", signup);
router.post("/login", login);

export default router