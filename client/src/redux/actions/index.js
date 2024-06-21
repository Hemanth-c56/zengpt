import axios from "axios"
import { isAction } from "redux";

const updateHistory = (data,id)=> async(dispath)=>{
    try{
        console.log("stroring history")
        await axios.put(`${window.location.origin}/api/users/zengpt/${id}`, {data});
        dispath({type: 'updateHistory', payload: data})
    }
    catch(err){
        console.log(err.message || "error occured");
    }
}

const getHistory = (id) => async(dispatch)=>{
    try{
        const res = await axios.get(`${window.location.origin}/api/users/zengpt/${id}`);
        dispatch({type: 'getHistory', payload: res.data.history});
    }
    catch(err){
        console.log(err.message || "error occured");
    }
}

// const deleteHistory = (id) => async(dispatch)=>{
//     try{
//         await axios.put(`http://localhost:8000/api/users/zengpt/delete/history/${id}`)
//         dispatch({type : 'deleteHistory', payload: []})
//     }
//     catch(err){
//         console.log(err.message || "error occured");
//     }
// }

const emptyLocalHistory = () => async(dispatch)=>{
    try{
        dispatch({type: 'emptyLocalHistory'})
    }
    catch(err){
        console.log(err.message || "error occ");
    }
}

export {updateHistory, getHistory, emptyLocalHistory}