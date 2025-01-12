import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorManager from "./middlewares/manageError.js";
import connectDB from "./config/mongoDb.js";
import authRoute from "./route/authRoute.js"
import dbRoute from "./route/dbRoutes.js"
import publicRoute from "./route/publicRoute.js"
import userStyleRoute from "./route/userRoutes/styleRoutes.js"

const app = express();

// configs
dotenv.config();
connectDB();

// middleWares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    secure: true,
    sameSite: "none"
}));

// routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/auth", authRoute)
app.use('/api/db',dbRoute)
app.use('/api/public',publicRoute)
app.use('/api/style',userStyleRoute)

app.use("*", (req, res) => {
    console.log("from not fouond")
    res.status(404).json({ message: "Route not found" });
});

const port = process.env.PORT || 3000;

app.use(errorManager)
app.listen(port, () => {
    console.log("Server is running on port 3000");
})