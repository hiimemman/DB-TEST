const dotenv =  require('dotenv').config();
import "reflect-metadata" 
import bodyParser from 'body-parser';
import express from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';


//middlewares 
import connectToMongoDB from './databases/DbConnection';  
import LoggerMiddleware from './middlewares/LoggerMiddleware';
import CorsMiddleware from "./middlewares/CorsMiddleware";
//router
import  UserRouter from './routes/UserRoutes';
import AuthRouter from "./routes/AuthRoutes";



const app = express();

// body-parser middleware to parse request bodies
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(LoggerMiddleware);
app.use(express.static("dist"))
// app.use(CorsMiddleware)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));



//routes
app.use('/api', UserRouter);
app.use('/api', AuthRouter);


//connect to database
const dbCon : string = process.env.MONGODB_URL || "";
connectToMongoDB(dbCon);

const port = process.env.PORT || 3002;

// check where the port we are listening
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
  console.log(`Visit http://localhost:${port}/api for available api`)
  console.log(`In liveserver it was running on ${process.env.BASE_URL}`)
});

// connectToDatabase()
export default app; // Export the express instance