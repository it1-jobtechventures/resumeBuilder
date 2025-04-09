import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import templateRouter from './routes/templateRoutes.js';
import authRouter from './routes/authRoutes.js';
import userModel from './model/userModel.js';
import generalInfoRouter from './routes/generalInfoRoutes.js';
import workExperienceRouter from './routes/workExperienceRoutes.js';
import projectSectionRouter from './routes/projectSectionRoutes.js';
import educationRouter from './routes/educationRoutes.js';
import skillRouter from './routes/skillsRoutes.js';
import internshipExperienceRouter from './routes/internshipExperienceRoutes.js';
import certificateRouter from './routes/certificateRoutes.js';
import interestsRouter from './routes/interestsRoutes.js';
import accomplishmentsRouter from './routes/accomplishmentRoutes.js';
import languageRouter from './routes/languageSectionRoutes.js';
import socialLinksRouter from './routes/socialMediaRoutes.js';
import softwareInfoRouter from './routes/softwareInfoRoutes.js';
import volunteeringRouter from './routes/volunteeringRoutes.js';
import referenceRouter from './routes/referenceSectionRoutes.js';
import resumeMetaRouter from './routes/resumeMetaRoutes.js';
import resumeRouter from './routes/resumeRoute.js';

dotenv.config();

const app = express();
const allowedOrigins = ['https://resumebuilder-frontend-asqk.onrender.com' , "http://localhost:5174" , "http://localhost:5173"] 

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
app.use('/api/generalInfo' , generalInfoRouter)
app.use('/api/workExperience',workExperienceRouter)
app.use('/api/project', projectSectionRouter)
app.use('/api/education', educationRouter)
app.use('/api/skills',skillRouter)
app.use('/api/internship' , internshipExperienceRouter)
app.use('/api/certificate' , certificateRouter)
app.use('/api/interest', interestsRouter)
app.use('/api/accomplishment' , accomplishmentsRouter)
app.use('/api/language' , languageRouter)
app.use('/api/socialMedia', socialLinksRouter)
app.use('/api/softwareInfo', softwareInfoRouter)
app.use('/api/volunteering' , volunteeringRouter)
app.use('/api/reference' , referenceRouter)
app.use('/api/resumeMeta', resumeMetaRouter)
app.use('/api/resume', resumeRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// Root route to handle GET /
app.get('/', (req, res) => {
    res.send('Welcome to the backend API!');
});