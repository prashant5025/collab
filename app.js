require('dotenv').config()
require('express-async-errors');

// packages
const bodyparser = require('body-parser');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const connectDB = require('./db/db.connect');
const authentication = require('./middlewares/auth.middleware');

// routes
const userRoute = require('./routes/user.route');

const projectRoute = require('./routes/project.router');
// const ideaRoute = require('./routes/idea.route');

//Middlewares routes
const notFoundMiddleware = require('./middlewares/not-found.middleware');
const errorHandlerMiddleware = require('./middlewares/error-handler.middleware');

// initialize app
const app = express();

// passport authentication middleware
// require('./controllers/auth/passport.auth')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
})
);
app.use(passport.initialize());
app.use(passport.session());

// middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// 404 route handler
// app.use((req, res, next) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found',
//   });
// })

// routes
app.use('/api/v1/users', userRoute);
// project url: http://localhost:8080/api/v1/${username}/project

app.use('/api/v1/project', authentication, projectRoute);



// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// start server
const start = async () => {
  try {
    // connect to database
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();

