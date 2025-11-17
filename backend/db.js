require("dotenv").config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to the database");
        const fetched_data =await  mongoose.connection.db.collection("fooditems");
        const data = await fetched_data.find({}).toArray();
        global.food_items = data;
        
        
        
        const catData = await mongoose.connection.db.collection("foodcategory");

        const cdata = await catData.find({}).toArray();
         
          
            global.foodCategory = cdata;

         
          

    




    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
};

module.exports = mongoDB;
