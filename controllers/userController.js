const User = require("../models/user.model.js");
const BigPromise = require("../middlewares/bigPromise");

const fileUpload = require("express-fileupload");
const cookieToken = require("../utils/cookieToken.js");
const Cloudinary = require("cloudinary");
const CustomError = require("../utils/customError");

//exporting the controllers

//Signup controller
module.exports.signup = BigPromise(async (req, res, next) => {
  //check if file is there or not
  // let result;
  if (!req.files || !req.files.photo) {
    return next(res.status(400).send("Image is required!"))
  }

  //from body we get required fields to verify
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).send("Name, password, and email are required");
  }
  let file = req.files.photo;
  const result = await Cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "Ecom",
      width: 150,
      crop: "scale",
    });
  
  //check for email
  //creating the user and connecting to mongoDb
  const user = await User.create({
    name,
    email,
    password,
    photo: {
      id: result.public_id,
      secure_url: result.secure_url,
    },
  });

  

  //calling cookieToken method
  cookieToken(user, res);
});

//login controller
module.exports.login= BigPromise(async(req,res,next)=>{
  //user will provide us the login details
  const {email ,password}=req.body;

  //check for presence of the email & password
  if(!email || !password){
    return next(new CustomError('please provide valid email and password',400));
  }

  //if present get the details from db
  const user = await User.findOne({email}).select("+password")
  if(!user){
    return next(new CustomError('Email not found!',400));
  }

  //for checking password
  const isPasswordCorrect = await user.isPassCorrect(password)
  if(!isPasswordCorrect){
    return next(new CustomError('You have entered wrong password',400));
  }
  cookieToken(user, res);
})

module.exports.logout= BigPromise(async(req,res,next)=>{
  res.cookie('token',null,{
    expires: new Date(Date.now()),
    httpOnly:true
  })
  res.status(200).send({
    sucess:true,
    message:'Logout is sucessful'
  })

})