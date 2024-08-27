import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

import authRoutes from "./routes/auth.route.js";
import quizRoutes from "./routes/quiz.route.js";

import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
    cors({
      origin: "*",
    })
  );

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
    flags: "a",
  });
  const errorStream = fs.createWriteStream(path.join(__dirname, "error.txt"), {
    flags: "a",
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use((err, req, res, next) => {
    const now = new Date();
    const time = ` ${now.toLocaleTimeString()}`;
    const error = `${req.method} ${req.originalUrl} ${time}`;
    errorStream.write(error + err.stack + "\n");
    res.status(500).send("Internal Server Error");
  });
  app.use((req, res, next) => {
    const now = new Date();
    const time = ` ${now.toLocaleTimeString()}`;
    const error = `${req.method} ${req.originalUrl} ${time}`;
    errorStream.write(error + "\n");
    res.status(404).send("Route not found!");
  });


app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("MongoDB connected");
        console.log(`Server is running on port ${process.env.PORT}`);
    }).catch(err => {
        console.log(err);
    })
})