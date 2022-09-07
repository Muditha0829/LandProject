//LandUs3r Rout3 T3mplat3

// const router = require("express").Router();
// let {ResearchPlusUser,validate} = require('../model/ResearchPlusUsers');
// const bcrypt = require('bcrypt');
// var nodemailer = require('nodemailer');
// const crypto = require('crypto');

// router.post('/add',async (req,res)=>{

//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL,
//             pass: process.env.PASSWORD
//         }
//     });

//     const token = crypto.randomBytes(48).toString('hex');

//     const link = `http://localhost:3000/verify/${token}`;

//     var mailOptions = {
//         from: 'researchplus@gmail.com',
//         to: req.body.email,
//         subject: 'Welcome to Rearch Plus! You successfully created account.',
//         text: 'That was easy!',
//         html: `<p><em>To veirfy your account please click <a href="${link}" target="_blank" rel="noopener">Here</a>.</em></p>`
//     };

//     try{
//         // console.log(req.body)
//         const {error} = validate(req.body);
//         if(error){
//             console.log("Problem with credentials")
//             console.log(req.body)
//             console.log(error.details[0].message)
//             return (res.status(400).send({message: error.details[0].message}))
//             // console.log(error.details[0].message)
//         }else{
//             const user = await ResearchPlusUser.findOne({email:req.body.email});

//             if(user){
//                 return res.status(409).send({message: "User with given email already exists"})
//             }
            
//             else{
//                 transporter.sendMail(mailOptions, async function(error, info){
//                     if (error) {
//                         console.log(error);
//                     } else {
//                         console.log('Email sent: ' + info.response);
                        
//                         const salt = await bcrypt.genSalt(Number(process.env.SALT));
//                         const hashPassword = await bcrypt.hash(req.body.password,salt)

//                         await new ResearchPlusUser({...req.body, password: hashPassword, isVerified: false, role: "student",token: token}).save()
//                         res.status(201).send({message: "User created Successfully"})
//                     }
//                 });
                
//             }
//         }
//     }catch (error){
//         res.status(500).send({message: "Internal Server Error"})
//     }
// })

// router.route("/editprofile").put(async (req,res)=>{
//     let userId  = req.body.userId;

//     const {username} = req.body;

//     const updateUser = {
//         username
//     }

//     const update = await ResearchPlusUser.findByIdAndUpdate(userId,updateUser).then(()=>{
//         res.status(200).send({message:"User Updated"})
//     }).catch((error)=>{
//         res.status(400).swnd({message:"Error with Updating data"+error})
//     })

// })


// router.route('/').get((req, res) => {
//     ResearchPlusUser.find().then((home_buildings) => {
//         res.json(home_buildings);
//     }).catch((err) => {
//         console.log(err);
//     })
// })

// router.route('/getPanel').get((req, res) => {
//     ResearchPlusUser.find({
//         role: "staffMember"
//     }).then((home_buildings) => {
//         res.json(home_buildings);
//     }).catch((err) => {
//         console.log(err);
//     })
// })


// router.route("/edit/:id").put(async (req,res)=>{
//     let userId = req.params.id;
//     const {role} = req.body;

//     const updateUser = {
//        role
//     }

//     const update = await ResearchPlusUser.findByIdAndUpdate(userId,updateUser).then(()=>{
//         res.status(200).send({status:"User Updated"})
//     }).catch((err)=>{
//         res.status(500).send({status: "Error with updating data",err});
//     })
// })

// router.route("/delete/:id").delete(async (req, res) => {
//     let userId = req.params.id;

//     await ResearchPlusUser.findByIdAndDelete(userId).then(() => {

//         res.status(200).send({status: "data deleted"});
//     }).catch((err) => {
//         console.log(err.message);
//         res.status(500).send({status: "error with delete data", error: err.message});
//     })
// })

// router.route('/:id').get((req,res)=>{

//     ResearchPlusUser.findById(req.params.id).then((users)=>{
//         res.json(users);
//     }).catch((err)=>{
//         res.json(err);
//     })
// })

// module.exports = router;