import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/auth-context"

function Navlinks(props){

    const auth = useContext(AuthContext);

    return(
        <ul className="nav-elements">
                <li onClick={props.close}><Link to="/" ><button className="headerBtn">HOME</button></Link></li>
                <li onClick={props.close}><Link to="/about"><button className="headerBtn">ABOUT</button></Link></li>
                {auth.isLoggedIn && <li onClick={props.close}><Link to="/profile"><button className="headerBtn" >PROFILE</button></Link></li>}
                {!auth.isLoggedIn && <li onClick={props.close}><Link to="/auth"><button className="headerBtn">SIGN-IN</button></Link></li>}
        </ul>
    )
}

export default Navlinks