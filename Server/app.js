import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
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

import errorHandler from "./middlewares/errorHandler.js";
app.use(errorHandler);

export default app;
