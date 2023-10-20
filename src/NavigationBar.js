import "./NavigationBar.css";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import DrinkardLogo from "./assets/drinkard-logo.png"
import { UserState } from "./context/User";

function NavigationBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav>
            <Link to="/" className="title">
                <img src={DrinkardLogo} alt="logo"></img>
            </Link>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <NavLink to="/play">Play</NavLink>
                </li>
                <li>
                    <NavLink to="/leaderboard">Leaderboard</NavLink>
                </li>
                <li>
                    <NavLink to="/settings">Settings</NavLink>
                </li>
                {UserState.username === '' ?
                    (<>
                        <li>
                            <NavLink to="/register">Register</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    </>) : null}
            </ul>
        </nav>
    );
};

export default NavigationBar;
