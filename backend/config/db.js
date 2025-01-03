const mongoose = require('mongoose');

const connect = async() => {
   return mongoose.connect('mongodb://localhost:27017/kitsune-shop').then(()=>{
        console.log("Mongodb connected");
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = connect;