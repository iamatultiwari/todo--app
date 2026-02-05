import express from "express";
import dotenv from 'dotenv'
import connectDB from "./src/db/dbconnection.js";
const app = express();
dotenv.config();

//const PORT = process.env.PORT || 4000

app.get('/', (req,res) => {
    res.send("hello their");
    console.log("server is started");
})

connectDB()
.then(() => {
    app.listen(`${process.env.PORT}`,() => {
    console.log(`app is listening at ${process.env.PORT}`);
})
})

.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
