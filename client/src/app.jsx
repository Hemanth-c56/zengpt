import React, { useState ,useCallback } from "react"
import "./app.css"
import Header from "./components/header/header"
import Hero from "./components/hero/hero"
import About from "./components/about/about"
import AuthPage from "./components/auth/authPage"
import Profile from "./components/profile/profile.jsx"
import {AuthContext} from "./components/context/auth-context.jsx"
import {useDispatch} from "react-redux"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getHistory, emptyLocalHistory } from "./redux/actions/index.js"
// import store from "./redux/store.js"

function App(){

    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState();
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const dispatch = useDispatch();

    const login = useCallback((id, uName, uEmail)=>{
        setIsLoggedIn(true);
        setUserId(id);
        setUserName(uName);
        setUserEmail(uEmail);
        dispatch(getHistory(id))
    },[])

    const logout = useCallback(()=>{
        setIsLoggedIn(false);
        setUserId(null);
        setUserName(null)
        setUserEmail(null)
        dispatch(emptyLocalHistory())
    },[])

    let routes;
    if(isLoggedIn){
        routes = (
            <React.Fragment>
                <Route path="/" element={<Hero />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path='/auth' element={<Navigate to={"/"}/>}></Route>
            </React.Fragment>
        )
    }
    else{
        routes = (
            <React.Fragment>
                <Route path="/" element={<Hero />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/auth" element={<AuthPage />}/>
                <Route path='*' element={<Navigate to={"/"}/>}></Route>
            </React.Fragment>
        )
    }

    return(
        <AuthContext.Provider value={{isLoggedIn: isLoggedIn, userId: userId, userName: userName, userEmail: userEmail, login: login, logout: logout}}>
                <div className="app">   
                    <Router>
                        <Header />
                        <Routes>
                            {routes}
                        </Routes>
                    </Router>
                </div>
        </AuthContext.Provider>
    )
}

export default App