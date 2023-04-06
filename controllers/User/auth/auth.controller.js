const User = require("../../../models/User.model");
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError} = require('../../../errors')



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

const profile = async (req, res) => {
  try {
    let id = req.user.userId
    console.log(id)
    const user = await User.findById(id);
    res.status(StatusCodes.OK).json({
      success: true,
      data: user,

    })


  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

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
        throw new BadRequestError("User not found");
    }
}

module.exports = {
  register,
  login,
  getAllUsers,
  profile,
  logout,
};
