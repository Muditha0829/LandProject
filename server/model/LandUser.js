//LandUs3r T3mplat3


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const jwt = require('jsonwebtoken');
// const passwordComplexity = require('joi-password-complexity');
// const Joi = require('joi');

// const landUsersSchema = new Schema({ 
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     isVerified:{
//         type:Boolean,
//         required:true
//     },
//     role: {
//         type: String,
//         required:true
//     },
//     token: {
//         type: String,
//     },
//     username: {
//         type: String,
//     }
// })

// landUsersSchema.methods.generateAuthToken = function(){
//     const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn:"7d"});
//     return token;
// }

// const LandUser = mongoose.model("landUsers",landUsersSchema);
// const validate = (data) =>{
//     const schema = Joi.object({
//         email: Joi.string().email().required().label("E mail"),
//         password: passwordComplexity().required().label("Password"),
//         isVerified: Joi.boolean()
//     });
//     return schema.validate(data);
// }
// module.exports = {LandUser,validate};

