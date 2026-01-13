import React from "react"
import { NavLink } from "react-router-dom"
import "./NavBar.css"
import logo from "./CodeVault logo1.png"

export default function NavBar() {
    return(
        <>
            <div className="NavContainer">
                <div className="NavLeft">
                    <div className="Navlogo">
                        <img src={logo} alt="CodeVault logo" />
                        <span>CodeVault</span>
                    </div>
                </div>

                <div className="NavLinks">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/pastes"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Codes
                    </NavLink>
                </div>
            </div>

            
        </>
    )
}