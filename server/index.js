import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorManager from "./middlewares/manageError";

const app = express();


dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));


app.get("/", (req, res) => {
    res.send("Hello World!");
});

const port = process.env.PORT || 3000;

app.use(errorManager)
app.listen(port, () => {
    console.log("Server is running on port 3000");
})