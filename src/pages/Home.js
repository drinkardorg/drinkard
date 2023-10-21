import './Home.css';
import NavigationBar from '../NavigationBar';
import DrinkardLogo from "../assets/drinkard-logo.png"

function Home() {
  return (
    <div className="Home">
      <NavigationBar />

      <img src={DrinkardLogo}></img>
    </div>
  );
}

export default Home;
