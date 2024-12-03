import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World!");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Server is running on port 3001");
})