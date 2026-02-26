import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import router from "./route.js"
import chatRouter from "./module/chat/chat.route.js"

import { ConnectDB } from "./config/mongo.js";
import { seedAdmin, seedCategories, seedStaff } from "./module/auth/auth.service.js";

dotenv.config()
ConnectDB()
    .then(() => {
        seedAdmin();
        seedStaff();
        seedCategories();
    })
    .catch((err) => {
        console.error("FAILED to start server due to DB connection error.");
        // Process will continue but downstream DB calls won't hang for 10s anymore 
        // since we know the connection is down.
    });


const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("HELLO from Backend!")
})

app.use("/uploads", express.static("uploads"));
app.use("/api", router)
app.use("/api/chat", chatRouter)

app.listen(PORT, () => {
    console.log(`🚀 server is running on: http://localhost:${PORT}`)
})
