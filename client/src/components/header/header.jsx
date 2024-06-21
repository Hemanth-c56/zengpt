import React, { useState } from "react"
import "./header.css"
import Navlinks from "../navlinks/navlinks"
import SideDrawer from "../sidedrawer/sidedrawer"
import Backdrop from "../backdrop/backdrop"

function Header(){

    var [drawerOpen , setDrawerOpen] = useState(false)

    function handleOpenDrawer(){
        setDrawerOpen(true)
    }

    function handleCloseDrawer(){
        setDrawerOpen(false)
    }
    
    return(
        <React.Fragment>
            {drawerOpen && <Backdrop close={handleCloseDrawer}/>}
            <SideDrawer show={drawerOpen}>
                <h1 className="side-drawer-h1">Go to</h1>
                <Navlinks close={handleCloseDrawer}/>
            </SideDrawer>
            <nav className="header">
                <h1><span style={{fontWeight:"800",color:"red"}}>Zen</span>GPT</h1>
                <div className="main-navigation-buttons">
                    <Navlinks />
                </div>
                <div className="hamburger" onClick={handleOpenDrawer}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Header