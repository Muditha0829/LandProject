const router = require("express").Router();
let profileWeb = require("../models/userProfile");

router.route("/add").post((req, res) => {

    new profileWeb({ ...req.body }).save().then(() => {
            res.json("Profile Created Successfully.");
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/").get((req, res) => {
    profileWeb.find().then((web) => {
            res.json(web);
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with getting data" });
        });
});

router.route("/delete/:id").delete(async (req, res) => {
    let outletID = req.params.id;

    await profileWeb.findByIdAndDelete(outletID).then(() => {
            res.status(200).send({ status: "Profile Deleted Successfully." });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete product", error: err.message });
        });
});

router.route("/update/:id").put(async (req, res) => {
    let outletid = req.params.id;

    await profileWeb.findByIdAndUpdate(outletid, req.body)
        .then(() => {
            res.status(200).send({ status: "Profile Updated Successfully."});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data" });
        });
});

router.route("/get/:id").get(async (req, res) => {
    let webID = req.params.id;

    await profileWeb.findById(webID).then((Data) => {
        res.json(Data);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with fetched header"});
    })
});

module.exports = router;