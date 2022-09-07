const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4501;

app.use(cors());
app.use(bodyParser.json());

//Importing Routes
const landuser = require('./routes/LandUserRoute.js');
const authRoutes = require('./routes/AuthRoute.js');

//Using Routes
app.use("/user",landuser);
app.use("/auth", authRoutes);

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


