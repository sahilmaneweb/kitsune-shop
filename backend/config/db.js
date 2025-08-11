import mongoose from "mongoose";

const dbUrl = process.env.DB_URL;

const connectDB = async() => {
    console.log(dbUrl);
   return mongoose.connect(dbUrl).then(()=>{
        console.log("Mongodb connected");
    }).catch((err) => {
        console.log(err);
    });
}

export default connectDB;