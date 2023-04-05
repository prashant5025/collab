// passport api routes

const passport = require('passport');
const { Router } = require('express');
const { StatusCodes } = require('http-status-codes');
const { register, login, getAllUsers } = require('../../controllers/auth/auth.controller');

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', passport.authenticate('jwt', { session: false }), getAllUsers);

