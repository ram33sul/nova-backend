import express, { Response } from "express";
import dotenv from "dotenv";
import connect from "./config/database";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routers";

dotenv.config();
connect();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = new Set([
  process.env.USER_FRONTEND_URL,
  process.env.ADMIN_FRONTEND_URL,
]);

app.use(
  cors({
    origin: (origin, callback) =>
      callback(null, !origin || allowedOrigins.has(origin)),
    credentials: true,
  })
);

app.use("/api", router);

app.use("/health", (_, res: Response) => {
  res.send("Server is healthy");
});

app.listen(PORT, () => {
  console.log(`Server successfully running at port: ${PORT}`);
});
