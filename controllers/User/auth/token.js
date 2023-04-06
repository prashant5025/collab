// const { validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../../models/user');

// const generateToken = (user) => {
//     const toke = jwt.sign({
//         email: user.email,
//         userId: user._id.toString()

//     })

//     return token;
// }

// const postToken = async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         const error = new Error('Validation failed.');
//         error.statusCode = 422;
//         error.data = errors.array();
//         throw error;
//     }
//     const email = req.body.email;
//     const password = req.body.password;
//     let loadedUser;
//     try {
        
//         const user = await User.

//     }catch(err) {
//         if (!err.statusCode) {
//             err.statusCode = 500;
//         }
//         next(err);
//     }
// }


// module.exports = {
//     postToken
// }
