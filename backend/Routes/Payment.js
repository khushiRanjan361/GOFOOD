const express = require('express')
const router = express.Router()
const Razorpay = require("razorpay");


router.post("/order",async(req,res)=>{
  
    try {
    const razorpay=new Razorpay({
      key_id:"rzp_test_Xvtot1QHJYEMaY",
      key_secret:"OXGIZsEtUpWyGM78eoh3Y9Uo"

  });
  const options = req.body;
  const order = await razorpay.orders.create(options);

  if (!order) {
    return res.status(500).send("Error");
  }

  res.json(order);
} catch (err) {
  console.log(err);
  res.status(500).send("Error");
}

})
module.exports = router;