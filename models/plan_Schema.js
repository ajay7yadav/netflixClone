const mongoose = require('mongoose');

const Plan = mongoose.Schema({

    planId : {
        type : String,
    },
    price : {
        type : String
    },
    duration : {
        type : String
    },
    device : {
        type : String
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    }

});

module.exports = mongoose.model('plans',Plan);