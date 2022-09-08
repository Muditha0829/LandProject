// LandUs3r T3mplat3

import mongoose from "mongoose";
const Schema = mongoose.Schema;
import jwt from "jsonwebtoken";
import passwordComplexity from "joi-password-complexity";
import Joi from "joi";

const landUsersSchema = new Schema({ 
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    province:{
        type:String,
        required:true
    },
    role: {
        type: String,
        required:true
    },
    token: {
        type: String,
    },
    username: {
        type: String,
    }
})

landUsersSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn:"7d"});
    return token;
}

const LandUser = mongoose.model("landUsers",landUsersSchema);
const validate = (data) =>{
    const schema = Joi.object({
        firstName:Joi.string(),
        lastName:Joi.string(),
        firstName:Joi.string(),
        email: Joi.string().email().required().label("E mail"),
        password: passwordComplexity().required().label("Password"),
        gender:Joi.string(),
        city:Joi.string(),
        province:Joi.string(),
        isVerified: Joi.boolean()
    });
    return schema.validate(data);
}
export { LandUser, validate };

