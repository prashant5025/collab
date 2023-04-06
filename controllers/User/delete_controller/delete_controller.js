const User = require("../../../models/User.model");
const { StatusCodes } = require('http-status-codes')
const { BadRequestError} = require('../../../errors')

const deleteUser = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findByIdAndRemove(id);
        if(!user){
            throw new BadRequestError('User not found');
        }
        res.status(StatusCodes.OK).json({message: 'User deleted successfully'});
    }catch(error){
        throw new BadRequestError(error.message);
    }
}

module.exports = {
    deleteUser
}

