import { React, useEffect } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Play from './pages/Play';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Leaderboard from "./pages/Leaderboard";
import { UserState } from './context/User';
import axios from 'axios';

function App() {
    if (UserState.username !== '' && UserState.password !== '') {
        let url = "http://localhost:8000/login";
        let body = {
            username: UserState.username,
            password: UserState.password
        };

        axios.post(url, body).then(response => {
            if (response.data.err !== undefined) {
                UserState.username = '';
                UserState.password = '';
            }
        });
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/play" element={<Play />}></Route>
                <Route path="/settings" element={<Settings />}></Route>
                <Route path="/leaderboard" element={<Leaderboard />}></Route>

                {UserState.username === '' ? (<Route path="/login" element={<Login />}></Route>) : <Route path="/login" element={<Home />}></Route>}
                {UserState.username === '' ? (<Route path="/register" element={<Register />}></Route>) : <Route path="/register" element={<Home />}></Route>}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
