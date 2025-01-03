const mongoose = require("mongoose");
const { _default } = require("validator");

const cartSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    items : {
        type : Object,
        default : {}
    },
    
}, {minimize : false});

module.exports = mongoose.model("Cart", cartSchema);