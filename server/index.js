import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();


dotenv.config();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello World!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running on port 3000");
})