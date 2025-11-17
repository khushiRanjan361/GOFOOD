


const express = require('express')
const app = express()
const port = 5000
const mongoDB=require("./db")
//////
// const Razorpay = require("razorpay");
 const cors = require("cors");

require("dotenv").config();



/////

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  
  );
  next();


})
mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
//
app.use('/api',require("./Routes/Payment"));
//
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//////////
const PORT=process.env.PORT;
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.listen(PORT, () => {
    console.log("Listening on port", PORT);
  });

