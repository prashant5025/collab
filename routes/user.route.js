// const express = require("express");
// const app = express();
// const router = express.Router();
// const passport = require("passport");
// const  auth  = require("../middleware/auth.middleware");

// const {
//   register,
//   login,
//   getAllUsers,
//   profile,
//   logout,
// } = require("../controllers/User/auth/auth.controller");
// const { updateDetails, updatePassword } = require("../controllers/User/update_controller/user.update.controller");
// const { deleteUser } = require("../controllers/User/delete_controller/delete_controller");
// const { forgotPassword, resetPassword } = require("../controllers/User/forget_password_controller/forget_password.controller")

// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}));
// app.get('/auth/google/cb', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/');
// });

// app.get('/auth/github', passport.authenticate('github', { scope: ['profile', 'email']}));
// app.get('/auth/github/cb', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/');
// });

// app.get('/auth/linkedin', passport.authenticate('linkedin', { scope: ['r_emailaddress', 'r_liteprofile']}));
// app.get('/auth/linkedin/cb', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/');
// });



// router.post("/register", register);
// router.post("/login", login);
// router.get("/logout", logout);
// router.get("/", getAllUsers);
// router.get("/:id", auth, profile);
// router.delete("/:id", auth, deleteUser);
// router.put("/:id", auth, updateDetails);
// router.post("/forgotpassword", forgotPassword);
// router.put("/resetpassword/:resettoken", resetPassword);
// router.put("/updatepassword", auth, updatePassword);


// module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middleware/auth.middleware');
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
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/', authController.getAllUsers);
router.get('/:id', authMiddleware, authController.profile);
router.delete('/:id', authMiddleware, deleteController.deleteUser);
router.put('/:id', authMiddleware, updateController.updateDetails);
router.post('/forgotpassword', forgetPasswordController.forgotPassword);
router.put('/resetpassword/:resettoken', forgetPasswordController.resetPassword);
router.put('/updatepassword', authMiddleware, updateController.updatePassword);

module.exports = router;

