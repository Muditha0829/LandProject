const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4500;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB Connection is Done");
})

//Importing Routes
const researchplususer = require('./routes/LandUserRoute.js');
const authRoutes = require('./routes/AuthRoute.js');

//Using Routes
app.use("/user",researchplususer);
app.use("/auth", authRoutes);




app.listen(PORT, ()=>{
    console.log(`Server is Running on port: ${PORT}`);
})
