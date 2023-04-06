const User = require('../../../models/User.model');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError} = require('../../../errors')




const updateDetails = async (req, res) => {
    try{
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, {
            name,
            email
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(StatusCodes.OK).json({
            success: true,
            data: user
        })
        console.log(user);
    }catch(error){
        throw new BadRequestError(error.message);
    }
}

const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try{
      const user = await User.findById(req.user.id).select('+password');
      if(!(await user.matchPassword(currentPassword))){
          throw new UnauthenticatedError("Password is incorrect");
      }
      user.password = newPassword;
      await user.save();
      res.status(StatusCodes.OK).json({
          success: true,
          message: "Password has been updated successfully"
      })
    }catch(error){
        throw new BadRequestError(error.message);
    }
}


module.exports = {
    updateDetails,
    updatePassword
}