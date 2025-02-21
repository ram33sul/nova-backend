import express, { Response } from "express";
import dotenv from "dotenv";
import connect from "./config/database";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
connect();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use("/health", (_, res: Response) => {
  res.send("Server is healthy");
});

app.listen(PORT, () => {
  console.log(`Server successfully running at port: ${PORT}`);
});
