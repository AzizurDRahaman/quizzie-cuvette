import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Auth Route!");
});

router.post("/sign-up", signup);

export default router