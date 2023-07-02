const express = require("express");
//require('dotenv').config();
const dotenv = require('dotenv');
const dbConnect = require("./config/dbConnect");
const userRoute = require("./routes/users/userRoutes");
const {errorHandler,notFound} = require("./middlewares/errorMiddleware");
const app = express();

dotenv.config();
//dbConnect
dbConnect();

app.use(express.json());

app.get("/",(req, res) => {
    res.json({msg: "Welcome to Expenses Tracker API"});
});

//routes
app.use("/",userRoute);

app.use("/api/users",userRoute);
//app.post('/register',registerUser);

// app.post('/login',(req, res) => {
//     res.json({user: "admin"});
// });

// app.delete('/:id',(req, res) => {
//     res.json({user: "admin"});
// });

// app.put('/:id',(req, res) => {
//     res.json({user: "admin"});
// });

app.use(notFound);
app.use(errorHandler); 


module.exports = app;