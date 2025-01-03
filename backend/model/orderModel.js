const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    },
    userContact : {
        type : Number,
        required : true
    },
    userEmail : {
        type : String,
        required : true
    },
    items : {
        type : Array,
        default : []
    },
    amount : {
        type : Number,
        require : true
    },
    address : {
        street : {type: String, required : true},
        city : {type: String, required : true},
        state : {type: String, required : true},
        country : {type: String, required : true},
        zipcode : {type: String, required : true},
    },
    status : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        required : true
    }
}, {minimize : false});

module.exports = mongoose.model("Order", orderSchema);