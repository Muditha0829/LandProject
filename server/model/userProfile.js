const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userProfile = new Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    homeAddress: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    personType:{
        type: String,
        required: true,
    },
    imgURL: {
        type: String
    }
})

const Web = mongoose.model('myProfile', userProfile);

module.exports = Web;