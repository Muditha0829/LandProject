// const router = require("express").Router();
import express from "express";
const router = express.Router();
// const { response } = require("express");
// let Sale = require("../model/Sale");
import { Sale } from "../model/Sale.js";

router.route("/add").post(async(req,res) => {

    const heading = req.body.heading;
    const houseNumber = req.body.houseNumber;
    const street = req.body.street;
    const city = req.body.street;
    const telephoneNumber = req.body.telephoneNumber;
    const mobileNumber = req.body.mobileNumber;
    const Description = req.body.Description;
    const price = req.body.price;

    const newsale = new Sale({
        heading,
        houseNumber, 
        street,
        city,
        telephoneNumber,
        mobileNumber,
        Description,
        price
    }) 

    try{
            newsale.save().then(()=>{
                res.json("Sale Added")
            }).catch((err)=>{
                console.log(err);
            })
                
        
    }catch (error){
        res.status(500).send({message: "Internal Server Error"})
    }

   

    

})


router.route("/").get((req,res)=>{
    Sale.find().then((sales)=>{
        res.json(sales)
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/update").put(async (req, res)=>{
    let saleID = req.query.groupID;    
    let heading = req.body.heading;
    let houseNumber = req.body.houseNumber;
    let street = req.body.street;
    let telephoneNumber = req.body.telephoneNumber;
    let mobileNumber = req.body.mobileNumber;
    let Description = req.body.Description;
    let price = req.body.price;

    await Sale.findByIdAndUpdate(saleID, {
        heading: heading,
        houseNumber: houseNumber,
        street: street,
        telephoneNumber: telephoneNumber,
        mobileNumber: mobileNumber,
        Description: Description,
        price: price
    })
    .then(()=>{
        res.status(200).send({status:"Sale updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data", error: err.message});
    })
})


router.route("/delete/:id").delete(async (req, res) => {
    let saleId = req.params.id;

    await Sale.findByIdAndDelete(saleId).then(() => {
            res.status(200).send({ status: "Sale deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete Sale", error: err.message });
        });
});



// router.route("/delete/:id").delete(async(req,res)=>{
//     let saleId = req.params.id;

//     await Sale.findByIdAndDelete(saleId)
//     .them(()=>{
//         res.status(200).send({status:"sale deleted", sale: update})
//     }).catch((err)=>{
//         console.log(err.message);
//         res.status(500).send({status:"Error with deleted sale", error: err.message});
//     });
// });




router.route("/get/:id").get(async (req, res)=> {
    let saleId = req.parms.id;
    const sale = await Group.findById(saleId)
    .then((Group) => {
        res.status(200).send({status:"sale fetched", Sale})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get  sale", error: err.message});

    })
})




export default router;