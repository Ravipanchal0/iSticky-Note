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
import userRouter from "./routes/profile.routes.js";
import noteRouter from "./routes/note.routes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", noteRouter);

export default app;
