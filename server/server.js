import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4501;

app.use(cors());
app.use(bodyParser.json());

//Importing Routes

import landuser from "./routes/LandUserRoute.js";
import authRoutes from "./routes/AuthRoute.js";
import rentalRoutes from "./routes/RentalRoute.js";
import sales from "./routes/sales.js";

//Using Routes
app.use("/user",landuser);
app.use("/auth", authRoutes);
app.use("/rental", rentalRoutes);
app.use("/sale",sales);

//Establishing connection between server and DB
const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB Connection is Done");
})
app.listen(PORT, ()=>{
    console.log(`Server is Running on port: ${PORT}`);
})


