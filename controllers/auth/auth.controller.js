const User = require("../../models/User.model");
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError} = require('../../errors')
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const bcrypt = require('bcryptjs');



const securePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}


const register = async (req, res) => {
  const user = await User.create({...req.body });
  try{
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name}, token });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide an email and password");
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json(" Invalid credentials ");
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new UnauthenticatedError("Invalid credentials");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: {name: user.name}, token});

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

const getMe = async (req, res) => {

    

  try{
    const user = await User.findById(req.user.id);
    res.status(StatusCodes.OK).json({
        success: true,
        data: user
    })
}catch(error){
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: error.message
    })
  }
}

// }

const sendResetPasswordEmail = async (name, email, token) => {
  try{
      const transporter =  nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
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
        <a href="http://localhost:3000/reset-password/${token}">Reset Password</a>`

    }

    transporter.sendMail(mailOptions, (err, info) => {
      if(err){
          console.log(err)

      }else{
          console.log("Mail has been send:-",info.reaponse)
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
              message: "Reset password link has been sent to your email"
          });

      }else{
          res.status(StatusCodes.OK).json({
              success: true,
              message: "This email is not registered with us"
          })
      }
  }catch(err){
      res.status(500).json({
          success: false,
          error: err.message
      })
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
}

// const updateDetails = async (req, res) => {
//     const fieldsToUpdate = {
//         name: req.body.name,
//         email: req.body.email
//     }

//     try{

//     }
//     catch(error){
//         res.status(500).json({
//             success: false,
//             error: error.message
//         })
//     }
// }

// const updatePassword = async (req, res) => {
//     const { currentPassword, newPassword } = req.body;
//     try{

//     }catch(error){
//         res.status(500).json({
//             success: false,
//             error: error.message
//         })
//     }
// }

const logout = async (req, res) => {
    try{
        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            data: {}
        })
    }catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {
  register,
  login,
  getAllUsers,
  getMe,
  forgotPassword,
  logout,
  resetPassword
};
