import HttpError from "../models/httpError.js"
import {validationResult} from "express-validator"
import User from "../models/user.js"

const signup = async(req,res,next)=>{
    try{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return next(new HttpError("Invalid Inputs passed , Please Check Your data", 422))
        }

        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email: email});
        if(existingUser){
            const error = new HttpError("User already exits!", 422);
            return next(error);
        }

        const newUser = await User.create({
            name,
            email,
            password,
            history:[]
        })

        res.status(201).json({
            message: "success",
            userId : newUser._id,
            userName : newUser.name,
            userEmail : newUser.email
        })

    }
    catch(err){
        const error = new HttpError(err || "SignUp failed , please try again later", 500);
        return next(error);
    }
}

const login = async(req,res,next)=>{
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(new HttpError("invalid credentials",422))
        }

        const {email, password} = req.body;

        const existingUser = await User.findOne({email: email});
        if(!existingUser){
            return next(new HttpError("Account doesn't exist", 400));
        }

        if(existingUser.password !== password){
            return next(new HttpError("password incorrect!",401));
        }

        res.status(201).json({
            message : "login successfull",
            userId : existingUser._id,
            userName : existingUser.name,
            userEmail : existingUser.email
        });
    }
    catch(err){
        const error = new HttpError("Login failed, please try again later", 500);
        return next(error);
    }
}

const GetHistoryById = async(req,res,next)=>{
    try{
        const {id} = req.params;

        const user = await User.findById(id);

        res.status(200).json({
            history : user.history
        })
    }
    catch(err){
        const error = new HttpError("fetching history failed", 500);
        return next(error);
    }
}

const UpdateHistoryById = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const {data} = req.body;

        await User.findByIdAndUpdate(id, {$push : {history: data}}, {new : true})

        res.status(201).json({
            message : "updation successfull",
        })
    }
    catch(err){
        return next(new HttpError("updating history failed", 400));
    }
}

// const deleteHistoryById = async(req,res,next)=>{
//     try{
//         const {id} = req.params;
//         await User.findByIdAndUpdate(id, { history: [] }, { new: true });
//     }
//     catch(err){
//         return next(new HttpError("deleting history failed", 422))
//     }
// }

const deleteUser = async(req,res,next)=>{
    try{
        const {id} = req.params;

        await User.findByIdAndDelete(id);

        res.status(201).json({
            message: "deletion successfull"
        })
    }
    catch(err){
        return next(new HttpError("deletion failed", 400));
    }
}

export {signup, login, GetHistoryById, UpdateHistoryById, deleteUser}