import React from "react";
import { Link } from "react-router-dom";
import "./Adopt.css";
import MeetDogs from "../../../images/meetdogs1.jpg";
import MeetCats from "../../../images/meetCats2.jpg";

const OpeningPage = () => {
  return (
    <div className="MeetMainPage">
        <section className="MeetDogs">
        <img style={{ width: '450px', height: '300px' }} src={MeetDogs} alt="DeleteImg" className="MeetDogs"></img>
        <Link to="/pets?animal=Dog" className="site-btn-meet"> Meet Dogs </Link>
        </section>

        <section className="MeetCats">
        <img style={{ width: '450px', height: '300px' }} src={MeetCats} alt="DeleteImg" className="MeetCats"></img>
        <Link to="/pets?animal=Cat" className="site-btn-meet"> Meet Cats </Link>
        </section>
     </div>    
  );
};

export default OpeningPage;


