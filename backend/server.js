import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import templateRouter from './routes/templateRoutes.js';
import authRouter from './routes/authRoutes.js';
import userModel from './model/userModel.js';

dotenv.config();

const app = express();
const allowedOrigins = ['http://localhost:5173']

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));


const logUsers = async () => {
    try {
        const users = await userModel.find();
        console.log("Users in Database:", users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

// Database Connection
connectDB().then(() => logUsers());

//Routes
app.use('/api/template' ,templateRouter)
app.use('/api/auth' ,authRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// Root route to handle GET /
app.get('/', (req, res) => {
    res.send('Welcome to the backend API!');
});