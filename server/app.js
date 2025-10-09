const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { connectDB } = require('./db/connection');
dotenv.config();
const UserRouter=require('./routes/user.route')
const projectRoute=require('./routes/project.route')
const CookieParser = require('cookie-parser');
const cors = require('cors')



// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to parse cookies
app.use(CookieParser());
// Allow credentialed requests from the client (so cookies can be set/sent)
app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
    }),
)




// Route to create a new user
app.use('/project',projectRoute)
app.use('/api/users', UserRouter);
// Endpoint to create a new user

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})