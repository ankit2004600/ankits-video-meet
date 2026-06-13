import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
  try {
    const connectionDb = await mongoose.connect(
      "mongodb://ankitkumar11924_db_user:ankit1234@ac-7mipbgb-shard-00-00.bkf7qyi.mongodb.net:27017,ac-7mipbgb-shard-00-01.bkf7qyi.mongodb.net:27017,ac-7mipbgb-shard-00-02.bkf7qyi.mongodb.net:27017/?ssl=true&replicaSet=atlas-n4popp-shard-0&authSource=admin&appName=Cluster0"
    );

    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log("LISTENING ON PORT 8000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();