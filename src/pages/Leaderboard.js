import "./Leaderboard.css"
import NavigationBar from "../NavigationBar";
import { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {
    let [leaderboard, setLeaderboard] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const url = "http://127.0.0.1:8000/leaderboard";
            const response = await axios.get(url);
            console.log("data: " + JSON.stringify(response.data));
            setLeaderboard(response.data);
        }
        fetchData();
    }, [setLeaderboard]);

    return (
        <div>
            <NavigationBar />

            <div className="leaderboard">
                <h1>Leaderboard</h1>

                {leaderboard !== null ? (
                    <table className="leaderboard-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Username</th>
                                <th>ELO Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((x, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{x.username}</td>
                                    <td>{x.elo_points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) :
                    <p>null</p>
                }

            </div>
        </div>
    )
}

export default Leaderboard;
