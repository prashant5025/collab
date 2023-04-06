const express = require("express");
const router = express.Router();
const  auth  = require("../middleware/auth.middleware");

const {
  register,
  login,
  getAllUsers,
  profile,
  logout,
} = require("../controllers/User/auth/auth.controller");
const { updateDetails, updatePassword } = require("../controllers/User/update_controller/user.update.controller");
const { deleteUser } = require("../controllers/User/delete_controller/delete_controller");
const { forgotPassword, resetPassword } = require("../controllers/User/forget_password_controller/forget_password.controller")


router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/", getAllUsers);
router.get("/:id", auth, profile);
router.delete("/:id", auth, deleteUser);
router.put("/:id", auth, updateDetails);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.put("/updatepassword", auth, updatePassword);


module.exports = router;
