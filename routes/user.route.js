const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getAllUsers,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  logout,
} = require("../controllers/auth/auth.controller");

// const { protect } = require('../middleware/auth');

router.post("/register", register);
router.post("/login", login);
// router.get('/logout', logout);
router.get('/', getAllUsers);
router.get('/:id', getMe);
// router.put('/updatedetails', protect, updateDetails);
// router.put('/updatepassword', protect, updatePassword);

module.exports = router;
