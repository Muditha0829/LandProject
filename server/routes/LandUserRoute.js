// LandUs3r Rout3 T3mplat3

// const router = require("express").Router();
// let {LandUser,validate} = require('../model/LandUser');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');

import express from "express";
const router = express.Router();
import { LandUser, validate } from "../model/LandUser.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

//Create a User
router.post('/add',async (req,res)=>{

    const token = crypto.randomBytes(48).toString('hex');

    try{
        const {error} = validate(req.body);
        if(error){
            console.log("Problem with credentials")
            console.log(req.body)
            console.log(error.details[0].message)
            return (res.status(400).send({message: error.details[0].message}))
        }else{
            const user = await LandUser.findOne({email:req.body.email});

            if(user){
                return res.status(409).send({message: "User with given email already exists"})
            }
            
            else{

                const salt = await bcrypt.genSalt(Number(process.env.SALT));
                const hashPassword = await bcrypt.hash(req.body.password,salt);

                await new LandUser({...req.body, password: hashPassword, role: "user",token: token}).save()
                res.status(201).send({message: "User created Successfully"})
                
            }
        }
    }catch (error){
        res.status(500).send({message: "Internal Server Error"})
    }
})

//Edit user data
router.route("/editprofile/:id").put(async (req,res)=>{
    let userId  = req.params.id;

    const {firstName,lastName,gender,city,province} = req.body;

    const updateUser = {
        firstName,
        lastName,
        gender,
        city,
        province

    }

    const update = await LandUser.findByIdAndUpdate(userId,updateUser).then(()=>{
        res.status(200).send({message:"User Updated"})
    }).catch((error)=>{
        res.status(400).swnd({message:"Error with Updating data"+error})
    })

})

//Get all users
router.route('/').get((req, res) => {
    LandUser.find().then((users) => {
        res.json(users);
    }).catch((err) => {
        console.log(err);
    })
})

// router.route('/getPanel').get((req, res) => {
//     LandUser.find({
//         role: "staffMember"
//     }).then((home_buildings) => {
//         res.json(home_buildings);
//     }).catch((err) => {
//         console.log(err);
//     })
// })


router.route("/edit/:id").put(async (req,res)=>{
    let userId = req.params.id;
    const {role} = req.body;

    const updateUser = {
       role
    }

    const update = await LandUser.findByIdAndUpdate(userId,updateUser).then(()=>{
        res.status(200).send({status:"User Updated"})
    }).catch((err)=>{
        res.status(500).send({status: "Error with updating data",err});
    })
})

//Delete a User
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await LandUser.findByIdAndDelete(userId).then(() => {

        res.status(200).send({status: "User Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting User", error: err.message});
    })
})

//Find by id
router.route('/:id').get((req,res)=>{

    LandUser.findById(req.params.id).then((users)=>{
        res.json(users);
    }).catch((err)=>{
        res.json(err);
    })
})

export default router;