const User = require("../../models/User.model");
const jwt = require("jsonwebtoken");



const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    const token = user.getSignedJwtToken({ id: user._id});
    res.status(201).json({
      success: true,
      token,
    });
    console.log(token);
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
    return res.status(400).json({
      success: false,
      error: "Please provide an email and password",
    });
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }
    const token = user.getSignedJwtToken({ id: user._id});
    res.status(200).json({
      success: true,
      token,
    });

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
    console.log(user);
    
    res.status(200).json({
        success: true,
        data: user

    })
}catch(error){
    res.status(500).json({
        success: false,
        error: error.message
    })

  }
}

// }

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try{

      

    }catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// const resetPassword = async (req, res) => {
//     const { resetPasswordToken } = req.params;
//     const { password } = req.body;
//     try{

//     }catch(error){
//         res.status(500).json({
//             success: false,
//             error: error.message

//         })
//     }
// }

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

// const logout = async (req, res) => {
//     try{
//         res.cookie('token', 'none', {
//             expires: new Date(Date.now() + 10 * 1000),
//             httpOnly: true
//         })
//         res.status(200).json({
//             success: true,
//             data: {}
//         })
//     }catch(error){
//         res.status(500).json({
//             success: false,
//             error: error.message
//         })
//     }
// }

module.exports = {
  register,
  login,
  getAllUsers,
  getMe,
  forgotPassword,
};
