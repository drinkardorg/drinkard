import "./Play.css"

import axios from "axios";
import { useEffect, useState } from "react";
import NavigationBar from "../NavigationBar";
import { UserState } from "../context/User";
import { useNavigate } from "react-router-dom";

import Card from "../context/Card"

function Play() {
    const navigate = useNavigate();
    const [turn, setTurn] = useState(null);
    const [user, setUser] = useState(null);
    const [play, setPlay] = useState(false);
    const [enemy, setEnemy] = useState(null);
    const [turnedCard, setTurnedCard] = useState(null);
    const [findingMatch, setFindingMatch] = useState(false);

    const [yourCards, setYourCards] = useState([]);
    const [enemyCards, setEnemyCards] = useState([]);

    const handleCardClick = (index) => {
        if (!play || turn !== UserState.username) {
            return;
        }

        const card = yourCards.at(index);
        console.log("selecting card ", card);

        yourCards.splice(index, 1);
        websocket.send(JSON.stringify({
            id: "turncard",
            cardvalue: card.value,
            cardsymbol: card.symbol,
        }));

        if (turnedCard === null) {
            setTurnedCard(card);
        } else {
            setTurnedCard(null);
        }
    };

    useEffect(() => {
        async function fetchData() {
            if (UserState.username === '' || UserState.password === '') {
                navigate("/login");
                return;
            }

            let url = "http://localhost:8000/login";
            let body = {
                username: UserState.username,
                password: UserState.password
            };

            let response = await axios.post(url, body);
            if (response.data.err !== undefined) {
                navigate("/login");
                UserState.username = '';
                UserState.password = '';
                return;
            }

            setUser(response.data);

            let emptyCards = [];
            for (let i = 0; i < 26; ++i) {
                emptyCards.push(new Card('', 0));
            }

            setYourCards(emptyCards);
            setEnemyCards(emptyCards);
            return;
        }

        fetchData();
    }, [setUser, navigate]);

    useEffect(() => {
        const changeCardStyle = (c, id) => {
            let card = document.getElementById(id);
            if (card === null) {
                console.log("null: ", id);
                return;
            }

            c.symbol = c.symbol.toLowerCase();

            let x = c.value - 1;
            let y;
            if (c.symbol === 'diamonds') {
                y = 0;
            } else if (c.symbol === 'hearts') {
                y = 1;
            } else if (c.symbol === 'spades') {
                y = 2;
            } else if (c.symbol === 'clubs') {
                y = 3;
            } else {
                x = 2;
                y = 4;
            }

            x = x * (203.0 / 2.0);
            y = y * (288.0 / 2.0);

            card.style.backgroundPosition = "-" + x + "px -" + y + "px";
        };

        const changeCardsStyle = (cards, id) => {
            for (let i = 0; i < cards.length; ++i) {
                changeCardStyle(cards[i], id + i);
            }
        }

        if (turnedCard !== null) {
            changeCardStyle(turnedCard, "selectedcardexist");
        }

        changeCardsStyle(yourCards, "yourcard");
        changeCardsStyle(enemyCards, "enemycard");
    }, [turn, turnedCard, yourCards, enemyCards]);

    const [websocket, setWebsocket] = useState(null);

    const findMatch = () => {
        setFindingMatch(true);

        const ws = new WebSocket("ws://localhost:8000/game");
        ws.addEventListener("open", (event) => {
            let auth = {
                username: UserState.username,
                password: UserState.password
            };

            ws.send(JSON.stringify(auth));
            ws.send(JSON.stringify({
                id: "findmatch"
            }));
        });

        setWebsocket(ws);
    };

    useEffect(() => {
        if (websocket === null) {
            return;
        }

        websocket.addEventListener("message", (event) => {
            let data = JSON.parse(event.data);
            console.log("got packet: ", data);

            switch (data.id) {
                case "gamestart": {
                    setPlay(true);
                    setYourCards(data.cards);
                    setEnemy({
                        username: data.opponent_name,
                        eloPoints: data.opponent_elo
                    });
                    break;
                }

                case "turnnotif": {
                    setTurn(data.turn);
                    break;
                }

                case "turnedcardnotif": {
                    if (data.symbol.length > 0) {
                        setTurnedCard(new Card(data.symbol.toLowerCase(), data.value));
                    } else {
                        setTurnedCard(null);
                    }
                    break;
                }

                default: {
                    console.log("invalid packet: ", data);
                    break;
                }
            }
        });
    }, [websocket]);

    return (
        <div className="Play">
            <NavigationBar />

            <h1>BRUH: {findingMatch.toString()}</h1>

            {!play ? (
                <div className="quick-play">
                    {findingMatch ? (
                        <label className="finding-match-label">Finding match...</label>
                    ) : (
                        <button className="quick-play-button" onClick={findMatch}>Find Match</button>
                    )}
                </div>
            ) : null}

            <div className="play-container">
                <div className="opponent-info">
                    {enemy !== null ? (
                        <label className="opponent-info-field">Your opponent: {enemy.username} ({enemy.eloPoints})</label>

                    ) : (
                        <label className="opponent-info-field"></label>
                    )}
                </div>

                {turn !== null ? (
                    <div className="opponent-info">
                        <label className="opponent-info-field">{turn === UserState.username ? "It's your turn! Select any card you want to turn!" : turn + "'s turn"}</label>
                    </div>
                ) : null}

                <div className="board">
                    <div className="enemycards">
                        {enemyCards.map((c, i) => (
                            <div id={"enemycard" + i} className="card1" key={i}>
                            </div>
                        ))}
                    </div>
                    <div className="selectedcard">
                        {turnedCard === null ? (
                            <div id="selectedcardnone" className="selectedcardnone"></div>
                        ) : (
                            <div id="selectedcardexist" className="selectedcardexist"></div>
                        )}
                    </div>
                    <div className="yourcards">
                        {yourCards.map((c, i) => ((turnedCard === null) || (c.symbol.toLowerCase() === turnedCard.symbol.toLowerCase()) || (turn !== UserState.username)) ? (
                            <div
                                id={`yourcard${i}`}
                                className="card2"
                                key={i}
                                onClick={() => handleCardClick(i)}
                            ></div>
                        ) : null)}
                    </div>

                </div>
                {
                    user ? (
                        <div className="your-info">
                            <label className="your-info-field">{user.username} ({user.elo_points})</label>
                        </div>)
                        : null
                }
            </div>

            {/* {play ? (
                
            ) : (
                <div className="">

                </div>
            )} */}
        </div >
    );
}

export default Play;
