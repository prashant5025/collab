require('dotenv').config()
require('express-async-errors');
// require('./controllers/auth/passport.auth')

// security middleware
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const express = require('express');
const app = express();

// db connection
const connectDB = require('./db/db.connect');







// middlewares





// routes

const userRoute = require('./routes/user.route');
// const ideaRoute = require('./routes/idea.route');




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));


app.use('/api/v1/users', userRoute);






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
