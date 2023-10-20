import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './Home';
import Play from './Play';
import Leaderboard from "./Leaderboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/play" element={<Play />}></Route>
                <Route path="/leaderboard" element={<Leaderboard />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
