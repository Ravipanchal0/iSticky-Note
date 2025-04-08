import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.ORIGIN }));
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Routers setup
import authRouter from "./routes/auth.routes.js";

app.use("/api/v1/auth", authRouter);

export default app;
