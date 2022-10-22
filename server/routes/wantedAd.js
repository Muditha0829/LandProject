const router = require("express").Router();
let Web = require("../models/wantedAd.js");

router.route("/add").post((req, res) => {

    new Web({ ...req.body }).save().then(() => {
            res.json("Wanted Ad Added Successfully.");
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/").get((req, res) => {
    Web.find().then((web) => {
            res.json(web);
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with getting data" });
        });
});

router.route("/delete/:id").delete(async (req, res) => {
    let outletID = req.params.id;

    await Web.findByIdAndDelete(outletID).then(() => {
            res.status(200).send({ status: "Wanted Ad Deleted Successfully." });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete product", error: err.message });
        });
});

router.route("/update/:id").put(async (req, res) => {
    let outletid = req.params.id;

    await Web.findByIdAndUpdate(outletid, req.body)
        .then(() => {
            res.status(200).send({ status: "Wanted Ad Updated Successfully."});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data" });
        });
});

router.route("/get/:id").get(async (req, res) => {
    let webID = req.params.id;

    await Web.findById(webID).then((Data) => {
        res.json(Data);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with fetched header"});
    })
});

module.exports = router;