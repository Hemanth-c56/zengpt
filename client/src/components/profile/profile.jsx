import React, { useContext } from "react"
import axios from "axios"
import {useSelector} from "react-redux"
import {AuthContext} from "../context/auth-context.jsx"
import "./profile.css"

const Profile = ()=>{

    let historyData = useSelector(state => state.history)
    const auth = useContext(AuthContext)

    const handleDeleteUser = async ()=>{
        // dispatch(deleteHistory(auth.userId));
        try{
            await axios.delete(`https://zengpt-api.vercel.app/api/users/zengpt/delete/account/${auth.userId}`)
            auth.logout()      
        }
        catch(err){
            console.log("err occured deleting user")
        }
    }

    return(
        <div className="profile-container">
            <div className="user-details-container">
                <div className="user-details-div">
                    <div><img className="users-icon" src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" alt="" /></div>
                    <div className="user-info">
                        <span>UserName :- {auth.userName}</span>
                        <span>Email :- {auth.userEmail}</span>
                    </div>
                </div>
                <div className="functionality-buttons-div">
                    <button className="profile-btns" onClick={()=>{auth.logout()}}>Sign Out</button>
                    <button className="profile-btns" onClick={handleDeleteUser}>Delete Account</button>
                </div>
            </div>
            <div className="history-container">
                <h1>HISTORY</h1>
                {historyData.map((chat, index)=>{
                    return (
                        <div key={index} className="history-div" >{chat}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default Profile;
