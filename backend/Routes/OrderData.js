const express = require('express')
const router = express.Router()
 const Order = require('../models/Orders')

 router.post('/orderData',async(req,res)=>{


    let data= req.body.order_data

    //let newData = [{ Order_data: data }];
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("1231242343242354",req.body.email)


    let eId =  await Order.findOne({'email':req.body.email})
    console.log(eId)
    if(eId === null){
        try {console.log(data)
            await Order.create({
                
                email:req.body.email,
                // order_data:[data]
                order_data:[data]
            }).then(() => {
                res.json({ success: true });
            })
        }catch(error){
            console.log(error.message)
            res.send("server Error",error.message);
        }
    }

    else {
           try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true });
                })
           } catch (error) {
               res.send("server error",error.message)
            
           }
        }
    
     
 })
     router.post('/myorderData',async(req,res)=>{
         try{
                let  myData =await Order.findOne({'email':req.body.email})
                res.json({orderData : myData})

 

         }catch(error){
            res.send("Error",error.message)
         }
        // try {
        //     console.log(req.body.email)
        //     let eId = await Order.findOne({ 'email': req.body.email })
        //     //console.log(eId)
        //     res.json({orderData:eId})
        // } catch (error) {
        //     res.send("Error",error.message)
        // }
        
     })






module.exports = router;

