const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require("../../../models/User.model");
const { StatusCodes } = require('http-status-codes')
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError} = require('../../../errors');



passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());








/*-----------Login and register using email and password------------------- */ 

const register = async (req, res) => {
  const user = await User.create({...req.body });
  try{
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: {name: user.name}, token});
    // const { name } = user;
    // res.redirect(`api/v1/user/${user.name}/dashboard`)
    // return;

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide an email and password");
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json(" Invalid credentials ");
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new UnauthenticatedError("Invalid credentials");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: {name: user.name}, token, redirect: `/${user.name}/dashboard`});

    // const { name } = user;

    // res.redirect(`/${name}/dashboard`)
    // return;

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
/*-----------Login and register using email and password------------------- */ 





/*-----------Login and register using google------------------- */ 

passport.use(
  new GoogleStrategy(
    {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    cbURL: "/api/v1/auth/google/cb",
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        // googleId: profile.id => this is the id of the user in google
        // name: profile.displayName => this is the name of the user in google
        // email: profile.emails[0].value => this is the email of the user in google
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
      };
      try {
        // check if user exists in our database
        let user = await User.findOne({ googleId: profile.id });
        // if user exists, return user
        if (user) {
          const token = user.createJWT();
          done(null, {user, token});
          // if user does not exist, create new user
        }else{
          user = await User.create(newUser);
          const token = user.createJWT();
          done(null, {user, token});
        }
      } catch (error) {
        console.error(error)
      }
    }
  )
);
/*-----------Login and register using google------------------- */ 

/*-----------Login and register using github------------------- */ 

passport.use(
  new GitHubStrategy(
    {
      // clientID: process.env.GITHUB_CLIENT_ID => this is the id of the app in github where we created the app and got the id
      // clientSecret: process.env.GITHUB_CLIENT_SECRET => this is the secret of the app in github where we created the app and got the secret api key
      // cbURL: "/api/v1/auth/github/cb" => this callback will be called after the user is authenticated in github
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      cbURL: "/api/v1/auth/github/cb",
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        githubId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
      }

      try {
        const user = await User.findOne({githubId: profile.id});

        if (user) {
          const token = user.createJWT();
          done(null, {user, token});

        }else{
          user = await User.create(newUser);
          const token = user.createJWT();
          done(null, {user, token})
        }
        
      } catch (error) {
        console.error(error)
      }
    }
  )
)

/*-----------Login and register using github------------------- */ 

/*-----------Login and register using LinkedIn------------------- */ 

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      cbURL: "/api/v1/auth/linkedin/cb",
      scope: ['r_emailaddress', 'r_liteprofile'],
    },
    async (accessToken, refreshToken, profile, done) => {

      const newUser = {
        linkedinId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,

      }
      try {
        const user = await User.findOne({ linkedinId: profile.id});
        if (user){
          const token = user.createJWT();
          done(null, {user, token});
        }else{
          user = await User.create(newUser);
          const token = user.createJWT();
          done(null, {user, token});
        }
      } catch (error) {
        console.error(error)
      }
    }
  )
)

/*-----------Login and register using LinkedIn------------------- */ 



const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

const profile = async (req, res) => {
  try {
    let id = req.user.userId
    console.log(id)
    const user = await User.findById(id);
    res.status(StatusCodes.OK).json({
      success: true,
      data: user,

    })


  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

const logout = async (req, res) => {
    try{
        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            data: {}
        })
    }catch(error){
        throw new BadRequestError("User not found");
    }
}

module.exports = {
  register,
  login,
  getAllUsers,
  profile,
  logout,
};
