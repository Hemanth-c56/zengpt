import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

const Connection = ()=>{
    const database_uri= 'mongodb+srv://hemanth_c56:resultmanagment@cluster0.mlsmf.mongodb.net/chatbot?retryWrites=true&w=majority&appName=Cluster0'

    mongoose.connect(database_uri).then(()=>{
        console.log("Database Connection Successfull!");
    })
}

export default Connection;