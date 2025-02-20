import express, { Response } from "express";
import dotenv from "dotenv";
import connect from "./config/database";

dotenv.config();
connect();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/health", (_, res: Response) => {
  res.send("Server is healthy");
});

app.listen(PORT, () => {
  console.log(`Server successfully running at port: ${PORT}`);
});
