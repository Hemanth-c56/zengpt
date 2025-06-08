import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import Connection from "./db/db.js"
import router from "./routes/userRoutes.js";
import HttpError from "./models/httpError.js";

const app = express();

app.use(cors({
    origin: ["https://hermits-zen.netlify.app", "http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


Connection();

app.get('/', (req,res)=>{
    res.send("hello user");
});
        
app.use('/api/users',router);

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
