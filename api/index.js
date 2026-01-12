require('dotenv').config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

// DB Connection
const conectionDB = require('./connection')


const app = express();

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:"GET PUT POST DELETE OPTIONS HEAD",
  allowedHeaders: "Content-Type, Authorization"
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

conectionDB();



const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});