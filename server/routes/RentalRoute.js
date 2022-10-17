import express from "express";
const router = express.Router();
import Rental from "../model/Rental.js";

router.route("/").post((req, res) => {
    const type = req.body.type;
    const town = req.body.town;
    const street = req.body.street;
    const heading = req.body.heading;
    const description = req.body.description;
    const floorArea = req.body.floorArea;
    const nearBus = req.body.nearBus;
    const nearTrain = req.body.nearTrain;
    const minTerm = req.body.minTerm;
    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.number;
    const PriceRS = req.body.PriceRS;
    const noOfDay = req.body.noOfDay;
    const priceForeign = req.body.priceForeign;
    const perMonth = req.body.perMonth;
    const availability = req.body.availability;
    const owner = req.body.owner;
    const userID = req.body.userID;


    const rental = new Rental({
        type,
        town,
        street,
        heading,
        description,
        floorArea,
        nearBus,
        nearTrain,
        minTerm,
        name,
        email,
        number,
        PriceRS,
        noOfDay,
        priceForeign,
        perMonth,
        availability,
        owner,
        userID
    });

    rental.save().then(() => {
            res.json("Rental AD Successfully Added");
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/").get((req, res) => {
    Rental.find().then((rentals) => {
            res.json(rentals);
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with getting data" });
        });
});

router.route("/:id").delete(async (req, res) => {
    let rentalID = req.params.id;

    await Rental.findByIdAndDelete(rentalID).then(() => {
            res.status(200).send({ status: "Rental deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete Rental", error: err.message });
        });
});

router.route("/:id").put(async (req, res) => {
    let rentalid = req.params.id;
    
    const { type,
        town,
        street,
        heading,
        description,
        floorArea,
        nearBus,
        nearTrain,
        minTerm,
        name,
        email,
        number,
        PriceRS,
        noOfDay,
        priceForeign,
        perMonth,
        availability,
        owner,
        userID } = req.body;

    const updateRental = {
        type,
        town,
        street,
        heading,
        description,
        floorArea,
        nearBus,
        nearTrain,
        minTerm,
        name,
        email,
        number,
        PriceRS,
        noOfDay,
        priceForeign,
        perMonth,
        availability,
        owner,
        userID
    };

    await Rental.findByIdAndUpdate(rentalid, updateRental)
        .then(() => {
            res.status(200).send({ status: "rental updated"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data" });
        });
});

router.route("/:id").get(async (req, res) => {
    let rentalID = req.params.id;

    await Rental.findById(rentalID).then((rental) => {
        res.json(rental);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "error with fetched rental data", err: err.message});
    })
})

router.route("/my/:id").get(async (req, res) => {
    let userID = req.params.id;

    await Rental.find({
        userID: userID
    }).then((rental) => {
        res.json(rental);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "error with fetched rental data", err: err.message});
    })
})

// router.route("/find").get(async (req, res) => { 
    
//     let categoryVal = req.query.category;

//     var query = {};

//     if(categoryVal === "All"){
//         query = {}
//     }
//     else{
//         query = {
//             category: categoryVal
//         }
//     }     
    
//     await Machine.find(query).then((machines) => {
//         res.json(machines);
        
//     }).catch((err) => {
//         console.log(err.message);
//         res.status(500).send({status: "error with fetched data", error: error.message});
//     })

// });

export default router;