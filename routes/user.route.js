
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middlewares/auth.middleware');
const authController = require('../controllers/User/auth/auth.controller');
const updateController = require('../controllers/User/update_controller/user.update.controller');
const deleteController = require('../controllers/User/delete_controller/delete_controller');
const forgetPasswordController = require('../controllers/User/forget_password_controller/forget_password.controller');


// Authentication routes for Google, Github, and LinkedIn
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/cb', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

router.get('/auth/github', passport.authenticate('github', { scope: ['profile', 'email'] }));
router.get('/auth/github/cb', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

router.get('/auth/linkedin', passport.authenticate('linkedin', { scope: ['r_emailaddress', 'r_liteprofile'] }));
router.get('/auth/linkedin/cb', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

// User authentication and authorization routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/logout',authMiddleware, authController.logout);
router.get('/', authController.getAllUsers);
router.get('/:id', authMiddleware, authController.profile);
router.delete('/:id', authMiddleware, deleteController.deleteUser);
router.put('/:id', authMiddleware, updateController.updateDetails);
router.post('/forgotpassword', forgetPasswordController.forgotPassword);
router.put('/resetpassword/:resettoken', forgetPasswordController.resetPassword);
router.put('/updatepassword', authMiddleware, updateController.updatePassword);

//


// get redirect response from login page





module.exports = router;

