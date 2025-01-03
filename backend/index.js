const express = require('express');
const cors = require('cors');
const productRoute = require('./router/productRouter');
const userRoute = require('./router/userRouter');
const cartRoute = require('./router/cartRouter');
const orderRoute = require('./router/orderRouter');
const mongoose = require('mongoose');
const app = express();
const port = 8080;

mongoose.connect('mongodb://127.0.0.1:27017/kitsune-shop').then(()=>{
        console.log("Mongodb connected");
    }).catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));
app.use("/images",express.static('public/productImage'));

app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log("Server started succesfully on port 8080");
    }
    
})