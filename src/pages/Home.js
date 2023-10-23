import './Home.css';
import NavigationBar from '../NavigationBar';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="Home">
      <NavigationBar />

      <div className="container1">
        {/* <img src={DrinkardLogo} alt="drinkard logo"></img> */}
        <h1 className="drinkard-title">Drinkard</h1>
        <label>Start your journey and set your strategy to become the top!</label>
        <Link to="/play" className="play-now-button">
          <button>Play Now</button>
        </Link>
      </div>
      <div className="container2">
        <h1 className="drinkard-title">What is drinkard?</h1>
        <p>Welcome to Drinkard, your passport to a world of card games and endless entertainment!
          We are thrilled to introduce you to our online platform dedicated to bringing the thrill of card games to a global audience.
          Whether you're a seasoned card shark or just looking to unwind with a friendly game, Drinkard is your go-to destination for all things card-related.
        </p>
        <br></br>
        <p>
          At Drinkard, we understand the joy and camaraderie that card games bring.
          That's why we've created a vibrant, user-friendly online space where players from around the world can gather, connect, and compete in a wide variety of card games.
          No matter where you are or what time it is, you can always find a card game to join or players to challenge.
        </p>
        <br></br>
        <p>
          Our platform is designed to be accessible to players of all skill levels, from beginners looking to learn the ropes to experts seeking a competitive edge.
        </p>
        <br></br>
        <p>
          Whether you're looking to relax, connect with friends, or sharpen your card-playing skills, Drinkard is your ultimate destination.
          Join us today and become part of a global community of card game enthusiasts.
          Let the cards fall where they may, and let the games begin!
        </p>
      </div>
      <div className="container2">
        <h1 className="drinkard-title">How to play?</h1>
        <p>This card game is a turn-based game and is played by two players, which means each player gets 26 cards by random.</p>
        <br></br>
        <p>The goal of this game is to be the first to run out of cards!</p>
        <br></br>
        <p>Since it is a turn-based game, the player who gets the turn will be randomized.</p>
        <br></br>
        <p>Each round, the player with the turn must turn any card in his deck, and the other player must response with a card but the symbol must match the card that was turned by the player with the turn.</p>
        <br></br>
        <p>In other words, if the player with the turn turns an Eight of Spades, then the other player must turn a spade card.</p>
        <br></br>
        <p>When both player has turned their cards, the next turn is decided by their cards value. The one with the higher card win the next turn!</p>
        <br></br>
        <p>There is a case where the other player does not have a card with the same symbol. If it happens, then the next turn will be the same player with the turn.</p>
        <br></br>
        <p>Have Fun!</p>
      </div>
    </div>
  );
}

export default Home;
