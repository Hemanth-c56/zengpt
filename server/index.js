import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import Connection from "./db/db.js"
import router from "./routes/userRoutes.js";
import HttpError from "./models/httpError.js";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();

app.use(cors({
    origin: ["https://hermits-zen.netlify.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


Connection();

app.use('/api/users',router);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Serve static files from the React frontend app
// app.use(express.static(path.resolve(__dirname, "client", "build")));
// API routes
app.use('/api/users', router);

// Catch-all route to serve the React frontend
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

app.use((req,res,next)=>{
    const error = new HttpError("Could not find this route", 404);
    throw error;
})

app.use((error, req, res, next)=>{
    if(res.headerSend){
        return next(error);
    }
    else{
        res.status(error.code || 500).json({
            message : error.message || "An unknown error occured"
        })
    }
})

app.listen(8000, ()=>{
    console.log(`server started at port ${process.env.PORT}`);
})
