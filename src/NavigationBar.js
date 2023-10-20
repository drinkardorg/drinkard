import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="Navigation-Bar">
            <Link to="/" className="Title">
                <h1>Drinkard.com</h1>
            </Link>

            <div className="Button-Container">
                <div className="Burger-Icon" onClick={toggleMenu}>
                </div>
                <input id="menu-toggle" type="checkbox" />
                <label class='menu-button-container' for="menu-toggle">
                    <div class='menu-button'></div>
                </label>

                <ul className="menu">
                    <Link to="/">
                        <li className="Home-Button">Home</li>
                    </Link>

                    <Link to="/play">
                        <li className="Play-Button">Play Online</li>
                    </Link>

                    <Link to="/leaderboard">
                        <li className="Leaderboard-Button">Leaderboard</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default NavigationBar;
