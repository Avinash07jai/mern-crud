
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// const User = require("./User");
const users = require("./model/UserSchema");

app.use(express.json())
// app.use(express.urlencoded())
app.use(cors())

const router = require("./routes/router");

const Port = 4000

mongoose.connect("mongodb://127.0.0.1:27017/mern", {
    useNewUrlParser:true,
    useUnifiedTopology:true
}, () => {
    console.log("mongoDB conneted")
})

app.use(router);

app.listen(Port , () => {
    console.log(`server is runing ${Port}`)
})