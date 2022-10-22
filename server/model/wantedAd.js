const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const adSchema = new Schema({

    adtype: {
        type: String,
        required: true,
    },
    town: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    adHeading: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    imgURL: {
        type: String
    },
    iName: {
        type: String
    }
})

const Web = mongoose.model( 'wantedAd', adSchema);

module.exports = Web;