const User = require("../../models/User.model");
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError} = require('../../errors')

const nodemailer = require('nodemailer');
const randomstring = require('randomstring');


module.exports = {
    forgetPassword
}