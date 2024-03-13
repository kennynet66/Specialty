import express, { NextFunction, Request, Response, json } from 'express';
import dotenv from 'dotenv';
import industryRoutes from './Routes/industry.Routes';
import authRoutes from './Routes/auth.Routes';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(cors());
app.use(json());

const PORT = process.env.PORT;

// Routes
app.use('/auth', authRoutes);
app.use('/industry', industryRoutes);

app.listen(PORT, () => {
    console.log('App is listening on port', PORT);
})
