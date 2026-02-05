import express from "express";
import dotenv from 'dotenv'

const app = express();
dotenv.config();


app.get('/', (req,res) => {
    res.send("hello their");
    console.log("server is started");
})

app.listen(process.env.PORT,() => {
    console.log(`app is listening at ${process.env.PORT}`);
})