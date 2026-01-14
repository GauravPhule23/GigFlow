require('dotenv').config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

// DB Connection
const conectionDB = require('./connection')

// Routers
const authRouter =  require('./Routes/Auth.Route');
const gigRouter = require('./Routes/Gig.Route')
const bidRouter = require('./Routes/Bid.Route')
const meRouter = require('./Routes/Me.Route')

// some custom middlewares
const checkToken = require('./Middlewares/auth.Middleware');

const app = express();
app.set('trust proxy', 1); //for render loadBalancer

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:["GET", "PUT", "POST", "DELETE", "OPTIONS", "HEAD", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkToken('token'));

conectionDB();

app.use('/api/me',meRouter)
app.use('/api/auth',authRouter)
app.use('/api/gigs',gigRouter)
app.use('/api/bids',bidRouter)



const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});