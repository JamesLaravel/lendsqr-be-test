import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { env, logger } from "./utils";
import Router from "./routes";
const startApp = async () => {
  const app = express();
  const corsOpts = {
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "*",
  };

  app.use(cors(corsOpts));
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.get("/status", (req, res) => {
    res.status(200).end();
  });

  app.get("/welcome", (req, res) => {
    res.send("Welcome to Demo Credit API");
  });

  app.use("/v1/", Router);

  const port = env("APP_PORT");
  app.listen(port, async () => {
    logger.info(` #################################################
    🛡️ App listening on port: ${port} 🛡️ 
    #################################################`);
  });
};

startApp();
