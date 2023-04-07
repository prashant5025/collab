/*require('dotenv').config()
require('express-async-errors');


// require('./controllers/auth/passport.auth')

// security middleware
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());







// packages
const express = require('express');
const app = express();


const connectDB = require('./db/db.connect');
const authentication = require('./middleware/auth.middleware');



// routes

const userRoute = require('./routes/user.route');
// const ideaRoute = require('./routes/idea.route');

//Middlewares routes
const notFoundMiddleware = require('./middleware/not-found.middleware');
const errorHandlerMiddleware = require('./middleware/error-handler.middleware');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
// app.use(passport.initialize());
// app.use(passport.session());

// 404 route


app.use('/api/v1/users', userRoute);



// Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);




//start server
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    }catch(err) {
        console.log(err);
    }
}

start();
*/

require('dotenv').config()
require('express-async-errors');

// packages
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const connectDB = require('./db/db.connect');
const authentication = require('./middleware/auth.middleware');

// routes
const userRoute = require('./routes/user.route');
// const ideaRoute = require('./routes/idea.route');

//Middlewares routes
const notFoundMiddleware = require('./middleware/not-found.middleware');
const errorHandlerMiddleware = require('./middleware/error-handler.middleware');

// initialize app
const app = express();

// passport authentication middleware
// uncomment the following line after configuring passport
// require('./controllers/auth/passport.auth')
app.use(passport.initialize());
app.use(passport.session());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// routes
app.use('/api/v1/users', userRoute);

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

