import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RentalSchema = new Schema({

    type: {
        type: String,
        required: true
    },

    town: {
        type: String,
        required: true
    },

    street:{
        type: String,
        required: true
    },

    heading:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    floorArea:{
        type: String,
        required: true
    },

    nearBus:{
        type: String,
        required: true
    },

    nearTrain:{
        type: String,
        required: true
    },

    minTerm:{
        type: String,
        required: true
    },

    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    number:{
        type: String,
        required: true
    },

    PriceRS:{
        type: String,
        required: true
    },

    noOfDay:{
        type: String,
        required: true
    },

    priceForeign:{
        type: String,
        required: true
    },

    perMonth:{
        type: String,
        required: true
    },

    availability:{
        type: String,
        required: true
    },

    owner:{
        type: String,
        required: true
    },

    userID:{
        type: String,
        required: true
    }

})

const rental = mongoose.model("rental", RentalSchema);

export default rental;