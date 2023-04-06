const User = require("../../../models/User.model");
const { StatusCodes } = require('http-status-codes')
const { BadRequestError} = require('../../../errors')
const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');
const randomstring = require('randomstring');


const securePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

const sendResetPasswordEmail = async (name, email, token) => {
  try{
      const transporter =  nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
          }
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Reset Password',
        html: `<h1>Hi ${name}</h1>
        <p>Click on the link below to reset your password</p>
        <a href="http://127.0.0.1:3000/api/v1/users/reset-password?token=${token}">Reset Password</a>`

    }

    transporter.sendMail(mailOptions, (err, info) => {
      if(err){
          console.log(err)

      }else{
          console.log("Mail has been send:-",info.response)
      }
  })


  }catch(err){
      res.status(500).json({
          success: false,
          error: err.message
      });
      
  }
}

const forgotPassword = async ( req,  res) => {
  try{
      const email = req.body.email;
      const userData = await User.findOne({email: email});

      if(userData){

          const randomString = randomstring.generate();
          const data = User.updateOne({email: email},
              {
                  $set: {
                      token: randomString
                  }
              });
          sendResetPasswordEmail(userData.name, userData.email, randomString)
          
          res.status(StatusCodes.OK).json({
              success: true,
              message: `Reset password link has been sent to your email ${userData.email}`
          });

      }else{
          res.status(StatusCodes.OK).json({
              success: true,
              message: "This email is not registered with us"
          })
      }
  }catch(err){
      throw new BadRequestError(err.message);
  }
}

const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const tokenData = await User.findOne({ token: token });
    if (tokenData) {
      const  password = req.body.password;
      const newpassword = await securePassword(password);
      const userData = await User.findByIdAndUpdate({
        _id: tokenData._id,

      },
      {
        $set: {
          password: newpassword,
          token: ""
        }
      },{
        new: true
      });
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Password has been reset successfully",
        data: userData
      })


    }else{
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Invalid token"
        })
    }
  } catch (error) {
    throw new BadRequestError(error.message);
  }
}




module.exports = {
    resetPassword,
    forgotPassword
}