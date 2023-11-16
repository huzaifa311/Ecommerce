require('dotenv').config()
console.log(process.env)

const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const router = require('./routes');
const app = express();
const Port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const DB_URI = process.env.DB_URI;
mongoose.connect(DB_URI)
mongoose.connection.on('connected', () => console.log("MongoDB Connected"))
mongoose.connection.on("error", (err) => console.log("MongoDB Error", err));

app.use(router)

app.get(('/'), (req, res) => {
    res.json({
        message: "SERVER UP!"
    });
});

app.listen(Port, () => {
    console.log(`Server Running on http://localhost:${Port}`);
});