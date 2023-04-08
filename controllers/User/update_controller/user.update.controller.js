const User = require('../../../models/User.model');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError} = require('../../../errors')
const {uploadCoverPicture, uploadProfilePicture} = require('../../../middlewares/upload.middleware');





// const updateDetails = async (req, res) => {
//     try{
        

//         const { name, email, mobileNo, address,city,state,country,zipCode,profileCover,profilePicture,bio,website,facebook,twitter,github,linkedin} = req.body;
//         const user = await User.findByIdAndUpdate(req.user.id, {
//             name, email, mobileNo, address,city,state,country,zipCode,profileCover,profilePicture,bio,website,facebook,twitter,github,linkedin
//         },{
//             new: true,
//             runValidators: true,
//             useFindAndModify: false
//         })
//         res.status(StatusCodes.OK).json({
//             success: true,
//             data: user
//         })
//         console.log(user);
//     }catch(error){
//         throw new BadRequestError(error.message);
//     }
// }

const updateDetails = async ( req, res ) => {
    try {
        uploadProfilePicture(req, res, async (err) => {
            if(err){
                console.error(err);
            }

            uploadCoverPicture(req, res, async (err) => {
                if(err){
                    console.error(err);
                }

                const { 
                    name, 
                    email, 
                    mobileNo, 
                    address,
                    city,
                    state,
                    country,
                    zipCode,
                    profileCover,
                    profilePicture,
                    bio,
                    website,
                    facebook,
                    twitter,
                    github,
                    linkedin} = req.body;

                const update = {
                    name, 
                    email, 
                    mobileNo, 
                    address,
                    city,
                    state,
                    country,
                    zipCode,
                    profileCover,
                    profilePicture,
                    bio,
                    website,
                    facebook,
                    twitter,
                    github,
                    linkedin};

                if (req.file) {
                    if (req.file.fieldname === 'profilePicture') {
                        updates.profilePicture = req.file.filename;
                    } else if (req.file.fieldname === 'profileCover') {
                        updates.profileCover = req.file.filename;
                    }
                }
                
                const user = await User.findByIdAndUpdate(
                    req.user.id,
                    update,
                    {
                        new: true,
                        runValidators: true,
                        useFindAndModify: false
                    }
                );

                res.status(StatusCodes.OK).json({
                    success: true,
                    data: user
                });

                console.log(user);
            });
        });
    } catch (error) {
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