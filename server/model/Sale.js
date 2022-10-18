import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
  
    heading : {     
        type : String,
        required : true
    },
    houseNumber : {
        type : String,
        required : true
    },
    street : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    telephoneNumber : {
        type : String,
        required : true
    },
    mobileNumber : {
        type : String
    },
    Description : {
        type : String
    },
    price : {
        type : String
    },
    
})

const Sale = mongoose.model("Sale",SaleSchema);

export { Sale };