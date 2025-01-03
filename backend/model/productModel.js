const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    category:{
        type : String,
        required : true
    },
    product : {
        type : String,
        required : true
    },
    offerPrice : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Product',productSchema);