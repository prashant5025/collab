const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    unique: true,
    trim: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be at most 50 characters long"],
  },
  email: {
    type: String,
    require: [true, "Please provide an email"],
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters long"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    ],
  },

  mobileNo: {
    type: String,
    match: [
      /^(\+\d{1,3}[- ]?)?\d{10}$/,
      "Please provide a valid mobile number"
    ]
  },

  address: {
    type: String,
    trim: true,
    maxlength: [500, "Address must be at most 500 characters long"],
  },

  city: {
    type: String,
    trim: true,
    maxlength: [50, "City must be at most 50 characters long"],
  },

  state: {
    type: String,
    trim: true,
    maxlength: [50, "State must be at most 50 characters long"],
  },

  country: {
    type: String,
    trim: true,
    maxlength: [50, "Country must be at most 50 characters long"],

  },

  avatar: {
    type: String,
    default: "default.jpg",

  },

  profileCover: {
    type: String,
    default: "default-cover.jpg",
  },

  bio: {
    type: String,
    maxlength: [500, "Bio must be at most 500 characters long"],
  },
    /*-------------social link start-------------------*/ 

  website: {
    type: String,
    match: [
      /^(https?:\/\/)?((w{3}\.)?)?([a-zA-Z0-9]+)\.([a-zA-Z]{2,3})(\.[a-zA-Z]{2,3})?$/,
      "Please provide a valid website",
    ],
  },
  facebook: {
    type: String,
    match: [
      /^(https?:\/\/)?((w{3}\.)?)?facebook\.com\/([a-zA-Z0-9]+)$/,
      "Please provide a valid facebook link",
    ],
  },
  twitter: {
    type: String,
    match: [
      /^(https?:\/\/)?((w{3}\.)?)?twitter\.com\/([a-zA-Z0-9]+)$/,
      "Please provide a valid twitter link",
    ],
  },
  github: {
    type: String,
    match: [
      /^(https?:\/\/)?((w{3}\.)?)?github\.com\/([a-zA-Z0-9]+)$/,
      "Please provide a valid github link",
    ],
  },
  linkedin: {
    type: String,
    match: [
      /^(https?:\/\/)?((w{3}\.)?)?linkedin\.com\/([a-zA-Z0-9]+)$/,
      "Please provide a valid linkedin link",
    ],
  },
  /*-------------social link end-------------------*/ 

    /*-------------role start here-------------------*/ 

  role: {
    type: String,
    enum: ["entrepreneur", "expert", "investor"],
  },

    /*-------------role end here-------------------*/ 


  // reset password start
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  // reset password end


  // account activation start
  createdAt: {
    type: Date,
    default: Date.now,
  },

  update: {
    type: Date,
    default: Date.now,
  }
});

// Encrypt password using bcrypt

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

})

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,

  });
};


// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;


};







module.exports = mongoose.model("User", UserSchema);
